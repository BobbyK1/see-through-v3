'use client'

import { Alert, AlertIcon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const SubmitOfferModal = ({ onClose, isOpen, id }) => {
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const params = useParams();
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = async (e) => {
        setLoading(true);
        setError('');

        e.preventDefault();

        if (!file) return;

        if (file.name.split('.').pop() !== "pdf") {
            setLoading(false);
            return setError('File type not supported. Please select a PDF.');
        }

        try {
            const data = new FormData();

            data.set('file', file);
            data.set('id', params.id);

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/database/submitOffer`, {
                method: "POST",
                body: data
            })

            if (!res.ok) {
                toast({
                    title: 'Unable to submit offer!',
                    description: "Please try again or contact support.",
                    status: 'error',
                    duration: 8000,
                })
            }

            if (res.ok) {
                toast({
                    title: "Offer Submitted!",
                    status: "success",
                    duration: 5000,
                    position: "bottom-right"
                })

                router.refresh();
            }
        } catch (e) {
            console.error(e)
        }

        onClose();
        setLoading(false);
    } 

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bgColor="#1c1c1c">
                    <ModalHeader>Submit Your Offer</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody mb="10">
                        <form onSubmit={handleSubmit}>
                            <Input accept="application/pdf" as="input" p="1" onChange={e => setFile(e.target.files?.[0])} type="file" />
                            <Input isDisabled={!file || loading} variant="filled" mt="5" as="button">Submit</Input>
                        </form>

                        {error && <Alert borderRadius="5" mt="5" status="error"><AlertIcon /> {error}</Alert>}
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export default SubmitOfferModal;