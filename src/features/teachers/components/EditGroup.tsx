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
import SubjectApi from "../api/TeacherApi.ts";
import {Circle, Colorful} from "@uiw/react-color";
import {useEffect, useState} from "react";
import {IGroupCreate, IGroupModel, IGroupUpdate, ISubjectModel} from "../types/students.ts";
import * as Yup from 'yup';
import TeacherApi from "../api/TeacherApi.ts";

export const EditGroup = ({ isOpen, onOpenChange, onEdited, item }: {isOpen: boolean, onOpenChange: (isOpen: boolean) => void, onEdited:Function, item: IGroupUpdate}) => {

    const [hex, setHex] = useState("#fff");

    useEffect(() => {
        formik.setFieldValue("id", item.id);
        formik.setFieldValue("name", item.name);

    }, [item]);

    const SignupSchema = Yup.object().shape({
        id: Yup.number()
            .required('Required'),
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const initialValues: IGroupUpdate = {
        id: item.id,
        name: item.name,
        shortName: item.shortName,
        formOfStudy: item.formOfStudy,
        yearOfStart: item.yearOfStart,
        yearOfEnd: item.yearOfEnd
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            TeacherApi.editGroup(values).then(res => {
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
                            <ModalHeader className="flex flex-col gap-1">Edit group</ModalHeader>
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
                                <Input
                                    autoFocus
                                    type={"text"}
                                    label="Short Name"
                                    name={"shortName"}
                                    value={formik.values.shortName}
                                    onChange={formik.handleChange}
                                    placeholder="Enter shortName of group"
                                    variant={"faded"}
                                    errorMessage={formik.errors.shortName}

                                />
                                <Input
                                    autoFocus
                                    type={"text"}
                                    label="Form of study"
                                    name={"formOfStudy"}
                                    value={formik.values.formOfStudy}
                                    onChange={formik.handleChange}
                                    placeholder="Enter formOfStudy of group"
                                    variant={"faded"}
                                    errorMessage={formik.errors.formOfStudy}

                                />
                                <div className="flex gap-2">
                                    <Input
                                        autoFocus
                                        type={"number"}
                                        label="Year of start"
                                        name={"yearOfStart"}
                                        value={formik.values.yearOfStart}
                                        onChange={formik.handleChange}
                                        placeholder="Enter formOfStudy of group"

                                        errorMessage={formik.errors.yearOfStart}

                                    />
                                    <Input
                                        autoFocus
                                        type={"number"}
                                        label="Year of end"
                                        name={"yearOfEnd"}
                                        value={formik.values.yearOfEnd}
                                        onChange={formik.handleChange}


                                        errorMessage={formik.errors.yearOfEnd}

                                    />
                                </div>

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