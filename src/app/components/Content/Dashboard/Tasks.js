'use client'

import { Box, Button, Center, Flex, Grid, GridItem, Select, Spinner, Stack, Text, Tooltip } from "@chakra-ui/react";
import { DueDate, Task } from "../../UI/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSupabase } from "@/app/context/SupabaseProvider";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { supabase, user } = useSupabase();

    const getTasks = async (selected) => {
        setLoading(true);
    
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
    
        try {
            let tasks;
            switch (selected) {
                case 'today':
                    tasks = await supabase
                        .from('tasks')
                        .select('transaction_id,title,due_date')
                        .eq('user_id', user.id)
                        .eq('due_date', formattedDate);
                    break;
                
                case 'upcoming':
                    tasks = await supabase
                        .from('tasks')
                        .select('transaction_id, title, due_date')
                        .eq('user_id', user.id)
                        .gt('due_date', formattedDate);
                    break;
    
                case 'overdue':
                    tasks = await supabase
                        .from('tasks')
                        .select('transaction_id, title, due_date')
                        .eq('user_id', user.id)
                        .lt('due_date', formattedDate);
                    break;
                
                default:
                    tasks = [];
                    break;
            }
    
            setTasks(tasks.data);
        } catch (error) {
            // Handle errors, e.g., display an error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => getTasks('today');
    }, [])
    

	return (
		<>
			<Stack direction="row" justify="space-between" alignItems="center">
				<Text fontSize="lg" fontWeight="bold" color="whiteAlpha.700">Tasks</Text>

				<Select onChange={e => getTasks(e.target.value)} defaultValue="today" w="fit-content" size="sm">
					<option value="today">Today</option>
					<option value="upcoming">Upcoming</option>
					<option value="overdue">Overdue</option>
				</Select>
			</Stack>
			

			<Box borderRadius="5" borderWidth="thin" borderColor="#2e2e2e" mt="5" p="2" h="275" overflowX="auto">
                {loading ? <Center><Spinner color="green.500" /></Center> : 
				tasks.length === 0 ?
					<Box w="fit-content" mx="auto" mt="10">
						<Text fontSize="md" color="whiteAlpha.700">No tasks yet...</Text>
					</Box>
				: tasks
					.slice() // Create a copy of the tasks array to avoid mutating the original
					.sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
					.map(task => {
						const formattedDueDate = new Date(task.due_date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
						});
						return (
								<Grid key={task.id} templateColumns="repeat(12, 1fr)" bg="#2e2e2e" minH="14" mb="1.5" borderRadius="5" w="full" p="4" shadow="sm" alignItems="center">
									<GridItem colSpan="4">
										<Flex alignItems="center" direction="row">
											<Task />
											<Tooltip label={task.title}>
												<Text ml="5" noOfLines="1" color="whiteAlpha.800">{task.title}</Text>
											</Tooltip>
										</Flex>
									</GridItem>
									<GridItem colSpan="4">
										<Flex alignItems="center" direction="row">
											<DueDate />
											<Text ml="5" color="whiteAlpha.700">{formattedDueDate}</Text>
										</Flex>
									</GridItem>
									<GridItem colSpan="4" display="flex" justifyContent="flex-end" alignItems="center">
										<Link href={`/dashboard/transactions/view/${task.transaction_id}/listing-info`}>
											<Button variant="ghost" _hover={{ color: "whiteAlpha.800" }} color="whiteAlpha.700" size="sm">View</Button>
										</Link>
									</GridItem>
								</Grid>
							)
						})}
			</Box>
		</>
	)
}

export default Tasks;