'use client'

import { Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CompleteButton = ({ taskId }) => {
    const [taskLoading, setTaskLoading] = useState({});

    const toast = useToast();
    const router = useRouter();

    const handleMarkComplete = async (id) => {
        setTaskLoading({
            ...taskLoading,
            [id]: true,
        });
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/database/deleteTask`, {
                method: "POST",
                body: JSON.stringify({
                    id: id
                })
            });
    
            if (response.ok) {
                router.refresh();

                toast({
                    title: "Task Completed!",
                    duration: 3500,
                    status: "success",
                    position: 'bottom-right',
                    variant: "subtle"
                });
            } else {
                throw new Error("Task completion failed.");
            }
        } catch (error) {
            console.error(error);
            setTaskLoading({
                ...taskLoading,
                [id]: false
            })
        } finally {
            setTaskLoading({
                ...taskLoading,
                [id]: true,
            });
        }
    };

    return <Button isLoading={taskLoading[taskId]} variant="ghost" _hover={{ color: "whiteAlpha.800" }} color="whiteAlpha.700" size="sm" onClick={() => handleMarkComplete(taskId)}>Mark As Complete</Button>
}

export default CompleteButton;