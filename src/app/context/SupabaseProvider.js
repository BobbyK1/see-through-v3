'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useContext, createContext, useState, useEffect } from "react";

const SupabaseContext = createContext();
 
export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const supabase = createClientComponentClient();
    const router = useRouter();

    const onAuthStateChanged = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
            .then(() => {
                router.push('/');
            })
    }

    useEffect(() => {
        onAuthStateChanged();
    }, []);

    return (
        <SupabaseContext.Provider value={{ user, signOut }}>
            {children}
        </SupabaseContext.Provider>
    )
}