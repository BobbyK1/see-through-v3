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
    const router = useRouter();

    const checkRole = async () => {
        setLoading(true);

        const { data : { user, error } } = await supabase.auth.getUser();

        // Redirect if user object is null
        if (!user) {
            return router.push(`/?continue=${encodeURIComponent(window.location.href)}`);
        }

        const { data } = await supabase.from('profiles').select('role').eq('id', user.id);

        if (error) throw new Error(error.message);
        
        // Redirect if user is not agent role
        if (data[0].role !== "agent") {
            return router.push(`/`);
        }

        setLoading(false);
    }

    useEffect(() => {
        checkRole();
    }, [])
    

    return (
        <DashboardContext.Provider value={null}>
            {loading ? <Flex w="100" h="100vh" bg="#1c1c1c" alignItems="center" justifyContent="center"><Spinner color="green.500" /></Flex> : children}
        </DashboardContext.Provider>
    )
}