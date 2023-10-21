'use client'

import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useClipboard } from "@chakra-ui/react";

const LinkModal = ({ onClose, isOpen, id }) => {
    const { onCopy, value, setValue, hasCopied } = useClipboard(`https://seethroughre.com/public/${id}`);

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bgColor="#1c1c1c">
                    <ModalHeader>Your Sharable Link</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody mb="10">
                        <Flex direction="row">
                            <Input onClick={onCopy} type="url" mr="2" value={value} isDisabled  />
                            <Button onClick={onCopy}>{ hasCopied ? "Copied!" : "Copy" }</Button>
                        </Flex>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </>
    )
}

export default LinkModal;