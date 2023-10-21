'use client'

import { Flex, Spinner } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useContext, createContext, useState, useEffect } from "react";

const DashboardContext = createContext();
 
export const useDashAuth = () => useContext(DashboardContext);

export const DashboardAuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const supabase = createClientComponentClient();
    const [role, setRole] = useState('');
    const router = useRouter();

    const checkRole = async () => {
        setLoading(true);

        const { data : { user, error } } = await supabase.auth.getUser();

        if (!user) {
            return router.push('/');
        }

        const { data } = await supabase.from('profiles').select('role').eq('id', user.id);

        if (error) throw new Error(error.message);

        if (data[0].role !== "agent") {
            return router.push('/');
        }

        setRole(data[0].role);

        console.log(data[0].role)
        setLoading(false);
    }

    useEffect(() => {
        console.log(role);
        checkRole();
    }, [])
    

    return (
        <DashboardContext.Provider value={null}>
            {loading ? <Flex w="100" h="100vh" bg="#1c1c1c" alignItems="center" justifyContent="center"><Spinner color="green.500" /></Flex> : children}
        </DashboardContext.Provider>
    )
}