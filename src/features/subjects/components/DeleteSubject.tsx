import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {Circle} from "@uiw/react-color";
import {ISubjectModel} from "../types/subjects.ts";
import SubjectApi from "../api/SubjectApi.ts";

export const DeleteSubject = ({onOpenChange, isOpen, subject, onDeleted}:{subject: ISubjectModel, onOpenChange: any, isOpen: boolean, onDeleted:Function}) => {


    const deleteSubject = () => {
        SubjectApi.deleteSubject(subject?.id).then(res => {
            onOpenChange(false);
            onDeleted();
        })
    }

    return (
        subject ?
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
                                    Do you want to delete [{subject.id}-{subject.name}] subject?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button  color="danger"  onPress={deleteSubject}>
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