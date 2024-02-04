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
import SubjectApi from "../api/GroupApi.ts";
import {Circle, Colorful} from "@uiw/react-color";
import {useState} from "react";
import {IGroupCreate} from "../types/groups.ts";
import * as Yup from 'yup';

export const CreateGroup = ({ isOpen, onOpenChange, onCreated }: {isOpen: boolean, onOpenChange: (isOpen: boolean) => void, onCreated:Function}) => {

    const [hex, setHex] = useState("#fff");

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const initialValues: IGroupCreate = {
        name: "",
        shortName: "",
        formOfStudy: "",
        yearOfStart: new Date().getFullYear(),
        yearOfEnd: new Date().getFullYear()+1
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            SubjectApi.createGroup(values).then(res => {
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
                            <ModalHeader className="flex flex-col gap-1">Create group</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    type={"text"}
                                    label="Name"
                                    name={"name"}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
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