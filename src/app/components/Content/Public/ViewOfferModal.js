'use client'

import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const ViewOfferModal = ({  offer }) => {
    const [loading, setLoading] = useState(false);
    const [pdfDataUri, setPdfDataUri] = useState('');

    const { onOpen, onClose, isOpen } = useDisclosure();

    const supabase = createClientComponentClient();

    useEffect(() => {
        const downloadOffer = async () => {
            setLoading(true);

            const encodedUrl = encodeURIComponent(offer.offer_url);
            const { data, error } = await supabase.storage.from('offers').download(encodedUrl);

            if (error) throw new Error(error.message);

            const buffer = Buffer.from(await data.arrayBuffer())

            const base64Data = buffer.toString('base64');
            const dataUri = `data:application/pdf;base64,${base64Data}`;
            setPdfDataUri(dataUri);

            return setLoading(false);
        }

        return () => downloadOffer();
    }, [])

    return (
        <>
            <Button onClick={onOpen} w="full" mt="3" variant="solid" size="sm" bg="green.500" colorScheme="green" borderWidth="thin" color="whiteAlpha.800">View Offer</Button>

            <Modal size="6xl" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bgColor="#1c1c1c">
                    <ModalHeader>View Your Offer</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody mb="10">
                        {loading ? <Spinner color="green.500" /> : 
                            <div style={{ width: '100%', height: '70vh', overflow: 'auto' }}>
                                <iframe
                                src={`${pdfDataUri}`}
                                type="application/pdf"
                                width="100%"
                                height="100%"
                                style={{ border: 'none' }}
                                />
                            </div>
                        }
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export default ViewOfferModal;