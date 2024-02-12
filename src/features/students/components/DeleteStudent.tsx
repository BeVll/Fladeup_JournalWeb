import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import {IStudentModel} from "../types/students.ts";
import StudentApi from "../api/StudentApi.ts";

export const DeleteStudent = ({onOpenChange, isOpen, item, onDeleted}:{item: IStudentModel, onOpenChange: any, isOpen: boolean, onDeleted:Function}) => {


    const deleteItem = () => {
        StudentApi.deleteStudent(item?.id).then(res => {
            onOpenChange(false);
            onDeleted();
        })
    }

    return (
        item ?
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
                                    Do you want to delete [{item.id}-{item.firstname} {item.lastname}] student?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button  color="danger"  onPress={deleteItem}>
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