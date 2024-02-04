import {IGroupModel} from "../../features/classes/types/groups.ts";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

export const DeleteModal = ({onOpenChange, isOpen, text, title, onDeletePress}:{text: string, title:string,  onOpenChange: any, isOpen: boolean, onDeletePress: Function}) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}

        >
            <ModalContent>
                {(onClose) => (

                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>

                            <p>
                                {text}
                            </p>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="flat" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button  color="danger"  onPress={onDeletePress}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};
