import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@nextui-org/react";
import {useFormik} from "formik";

import SubjectApi from "../api/SubjectApi.ts";
import {Colorful} from "@uiw/react-color";
import {ISubjectCreate} from "../types/subjects.ts";
import * as Yup from 'yup';

export const CreateSubject = ({ isOpen, onOpenChange, onCreated }: {isOpen: boolean, onOpenChange: (isOpen: boolean) => void, onCreated:() => void}) => {


    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        color: Yup.string()
            .min(3, 'Too Short!')
            .max(7, 'Too Long!')
            .required('Required'),
    });

    const initialValues: ISubjectCreate = {
        name: '',
        color: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            SubjectApi.createSubject(values).then(() => {
                formik.resetForm();
                onCreated();
                onOpenChange(false);
            })
        },
    });

    return (
        <Modal
            backdrop={"blur"}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={formik.handleSubmit}>
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create subject</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    type={"text"}
                                    label="Name"
                                    name={"name"}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    placeholder="Enter name of subject"
                                    variant={"faded"}
                                    errorMessage={formik.errors.name}

                                />

                                <Colorful
                                    disableAlpha={true}
                                    className="w-full py-2"
                                    style={{width: "100%"}}
                                    color={formik.values.color}
                                    defaultValue={1}
                                    onChange={(color) => {
                                        formik.setFieldValue("color", color.hex);
                                    }}
                                />
                                <span className="text-danger text-[12px]">{formik.errors.color}</span>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type={"submit"} >
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};