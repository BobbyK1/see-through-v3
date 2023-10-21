'use client'

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

const overlayStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0)',  // Make the overlay transparent
    pointerEvents: 'none',  // Prevent interaction with the overlay
  };

const PreviewModal = ({ onClose, isOpen, id }) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                <ModalOverlay />

                <ModalContent bg="#1c1c1c" p="none">
                    <ModalHeader>
                        <Text>Preview</Text>
                    </ModalHeader>

                    <ModalCloseButton />

                    <ModalBody>
                        <div style={overlayStyle}>
                            <iframe sandbox="allow-same-origin allow-scripts" style={{ width: "100%", height: "60vh", borderRadius: "10px", borderWidth: "thin"}} src={`${process.env.NEXT_PUBLIC_URL}/public/${id}`} /> 
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PreviewModal;