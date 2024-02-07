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
import SubjectApi from "../api/StudentApi.ts";
import {Circle} from "@uiw/react-color";
import {useState} from "react";
import {ISubjectCreate} from "../types/students.ts";

export const CreateModal = ({ isOpen, onOpenChange, onCreated }: {isOpen: boolean, onOpenChange: (isOpen: boolean) => void, onCreated:Function}) => {

    const [hex, setHex] = useState("#fff");

    const initialValues: ISubjectCreate = {
        name: '',
        color: ''
    }

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit: values => {
            SubjectApi.createSubject(values).then(res => {

                onCreated();
                onOpenChange(true);
            })
        },
    });

    return (
        <Modal
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
                                    variant="bordered"
                                />

                                <Circle

                                    colors={[
                                        "#bc0d0d",
                                        "#3f2daa",
                                        "#aaaf5c",
                                        "#7b6c41",
                                        "#d77c76",
                                        "#2240cd",
                                        "#4e22f0",
                                        "#77a235",
                                        "#9433b7",
                                        "#7d8a69",
                                        "#c16d50",
                                        "#b56736",
                                        "#d6504e",
                                        "#4d7f4a",
                                        "#0b4eab",
                                        "#29a79e",
                                        "#0f825d",
                                        "#a55759",
                                        "#aa8b33",
                                        "#4753af",
                                        "#79497a",
                                        "#7f2b50",
                                        "#70ad9e",
                                        "#d1a961",
                                        "#b25a2e",
                                        "#5e1a1f",
                                        "#36a7b2",
                                        "#9f519a",
                                        "#9359d4",
                                        "#4059d4"
                                    ]}

                                    color={formik.values.color}

                                    onChange={(color) => {
                                        formik.setFieldValue("color", color.hex);
                                    }}
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type={"submit"}>
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