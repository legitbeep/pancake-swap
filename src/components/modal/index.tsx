import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
  } from '@chakra-ui/react'

type customModalType = {
    title: string;
    desc?: string;
    footer?: React.FC;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactChild;
}

const CustomModal = ({isOpen,onClose,footer,desc,title,children}:customModalType) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {desc || children}
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={onClose} width="100%">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

  export default CustomModal;