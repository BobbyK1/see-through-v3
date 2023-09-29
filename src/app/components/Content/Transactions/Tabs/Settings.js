'use client'

import { Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";


export default function Settings ({ id }) {
    const toast = useToast();
    const router = useRouter();

    const deleteTransaction = async () => {
        fetch('/api/v1/database/deleteTransaction', {
            method: "POST",
            body: JSON.stringify({
                id: id
            })
        })
        .then(() => {
            toast({
                title: "Transaction deleted",
                position: "bottom-right",
                status: "success",
                variant: "subtle",
                duraction: 5000
            })

            router.refresh();
            router.push('/dashboard/transactions');
        })
        .catch(error => {
            toast({
                title: "Error",
                description: error,
                position: "bottom-right",
                status: "error",
                variant: "subtle",
                duration: 5000
            })
        })
    }

    return (
        <>
            <Button onClick={deleteTransaction} colorScheme="red">Delete</Button>
        </>
    )
}