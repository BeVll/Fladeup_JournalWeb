import {
    Button,
    Checkbox,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, useDisclosure
} from "@nextui-org/react";
import {useFormik} from "formik";
import AuthApi from "../../auth/api/AuthApi.ts";
import {formHttp, http} from "../../../http.ts";
import {jwtDecode} from "jwt-decode";
import {AuthUserActionType, IUser} from "../../../lib/store/types.ts";
import {useDispatch} from "react-redux";
import SubjectApi from "../api/SubjectApi.ts";
import {Circle, Colorful} from "@uiw/react-color";
import {useEffect, useState} from "react";
import {ISubjectCreate, ISubjectModel} from "../types/subjects.ts";
import * as Yup from 'yup';

export const EditSubject = ({ isOpen, onOpenChange, onEdited, subject }: {isOpen: boolean, onOpenChange: (isOpen: boolean) => void, onEdited:Function, subject: ISubjectModel}) => {

    const [hex, setHex] = useState("#fff");

    useEffect(() => {
        formik.setFieldValue("id", subject.id);
        formik.setFieldValue("name", subject.name);
        formik.setFieldValue("color", subject.color);
    }, [subject]);

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
        id: subject.id,
        name: subject.name,
        color: subject.color
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            SubjectApi.editSubject(values).then(res => {

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