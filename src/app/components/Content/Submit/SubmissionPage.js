'use client'

import { useSupabase } from "@/app/context/SupabaseProvider"
import { Container, Input } from "@chakra-ui/react"

export default function SubmissionPage() {
    const { supabase } = useSupabase();

    const search = async (query) => {
        if (query.length > 4) {
            var { data, error } = await supabase.from('transactions').select().textSearch('fts', query, { type: 'websearch', config: 'english'});
        }

        if (error) throw new Error(error.message);

        console.log(data);
    }

    return (
        <>
            <Container maxW="container.lg" mx="auto">
                <Input bg="#1e1e1e" onChange={(e) => search(e.target.value)} placeholder="Search by MLS ID, Address, or Listing/Co. Listing Agent..." />
            </Container>
        </>
    )
}