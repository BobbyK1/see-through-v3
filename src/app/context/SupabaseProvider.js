'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useContext, createContext, useState, useEffect } from "react";

const SupabaseContext = createContext();
 
export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const supabase = createClientComponentClient();
    const router = useRouter();

    const onAuthStateChanged = async () => {
        setAuthLoading(true);

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

        setAuthLoading(false);
    }

    const signOut = async () => {
        setAuthLoading(true);

        await supabase.auth.signOut()
            .then(() => {
                router.refresh();
                router.push('/');
            })

        setAuthLoading(false);
    }

    useEffect(() => {
        onAuthStateChanged();
    }, []);

    return (
        <SupabaseContext.Provider value={{ user, signOut, supabase, authLoading }}>
            {children}
        </SupabaseContext.Provider>
    )
}