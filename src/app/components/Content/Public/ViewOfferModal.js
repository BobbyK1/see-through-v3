'use client'

import { useSupabase } from "@/app/context/SupabaseProvider";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner } from "@chakra-ui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const ViewOfferModal = ({ onClose, isOpen, offer }) => {
    const [loading, setLoading] = useState(false);
    const [pdfDataUri, setPdfDataUri] = useState('');

    const supabase = createClientComponentClient();

    useEffect(() => {
        const downloadOffer = async () => {
            setLoading(true);

            const { data, error } = await supabase.storage.from('offers').download(offer.offer_url);

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
            <Modal size="6xl" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bgColor="#1c1c1c">
                    <ModalHeader>View Your Offer</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody mb="10">
                        {loading ? <Spinner color="green.500" /> : 
                            <iframe
                                src={pdfDataUri}
                                type="application/pdf"
                                width="100%"
                                height="700px"
                                />
                        }
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export default ViewOfferModal;