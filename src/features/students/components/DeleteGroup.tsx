import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import {IGroupModel, ISubjectModel} from "../types/students.ts";
import StudentApi from "../api/StudentApi.ts";

export const DeleteGroup = ({onOpenChange, isOpen, group, onDeleted}:{group: IGroupModel, onOpenChange: any, isOpen: boolean, onDeleted:Function}) => {


    const deleteItem = () => {
        StudentApi.deleteGroup(group?.id).then(res => {
            onOpenChange(false);
            onDeleted();
        })
    }

    return (
        group ?
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}

        >
            <ModalContent>
                {(onClose) => (

                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete subject</ModalHeader>
                            <ModalBody>

                                <p>
                                    Do you want to delete [{group.id}-{group.name}] subject?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button  color="danger"  onPress={deleteClass}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                )}
            </ModalContent>
        </Modal>
            :
            <></>
    );
};