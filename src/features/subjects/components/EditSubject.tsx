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
import {useEffect} from "react";
import * as Yup from 'yup';
import {ISubjectModel} from "../types/subjects.ts";

export const EditSubject = ({ isOpen, onOpenChange, onEdited, item }: {isOpen: boolean, onOpenChange: (isOpen: boolean) => void, onEdited:() => void, item: ISubjectModel}) => {


    useEffect(() => {
        formik.setFieldValue("id", item.id);
        formik.setFieldValue("name", item.name);
        formik.setFieldValue("color", item.color);
    }, [item]);

    const SignupSchema = Yup.object().shape({
        id: Yup.number()
            .required('Required'),
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        color: Yup.string()
            .min(3, 'Too Short!')
            .max(7, 'Too Long!')
            .required('Required'),
    });

    const initialValues: ISubjectModel = {
        id: item.id,
        name: item.name,
        color: item.color
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            SubjectApi.editSubject(values).then(() => {
                onEdited();
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
                                    className="w-full"
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
                                    Edit
                                </Button>
                            </ModalFooter>
                        </>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};