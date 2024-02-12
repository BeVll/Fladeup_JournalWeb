import {Button, Image, Input, Select, SelectItem, Tooltip} from "@nextui-org/react";
import {MdPhotoCamera} from "react-icons/md";
import * as Yup from "yup";
import {IGroupCreate} from "../../classes/types/groups.ts";
import {useFormik} from "formik";
import SubjectApi from "../../classes/api/GroupApi.ts";
import {IStudentCreate} from "../types/students.ts";

export const CreateStudent = () => {

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                formik.setFieldValue('image', e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const initialValues: IStudentCreate = {
        firstname: "",
        lastname: "",
        image: "",
        indetificateCode: "",
        dateOfBirth: new Date(),
        placeOfBirth: "",
        sex: "",
        national: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            SubjectApi.createGroup(values).then(res => {
                formik.resetForm();
            })
        },
    });

    return (
        <div className={"flex flex-col gap-10"}>

            {/*==========Section 1================*/}
            <div className={"grid md:grid-cols-2 grid-cols-1 gap-4"} style={{gridTemplateColumns: "25% auto"}}>
                <div className={"flex flex-col"}>
                    <h1 className="font-bold text-sm">Personal Information</h1>
                    <span className="text-content4 text-sm">Enter personal information of student like firstname, lastname, email, place of birth, date of birth and others..</span>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex gap-4"}>
                        {formik.values.image ?
                            <Image className="rounded w-full"
                                   src={formik.values.image}/>
                            :
                            <div
                                className="border-2 rounded-xl p-4 border-content3 flex items-center h-[140px] w-[105px]">
                                <MdPhotoCamera className="text-default-300 "
                                               size={100}/>
                            </div>

                        }
                        <div className={"flex flex-col gap-2 justify-center"}>
                            <div className="w-fit relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="upload-image" // <-- Make sure this matches htmlFor in the label
                                />
                                <label htmlFor="upload-image" className="h-[200px]">
                                    <Button type={"button"}  size={"sm"} color={"primary"} className="w-fit cursor-pointer">
                                        Change avatar
                                    </Button>
                                </label>
                            </div>
                            <span className="text-default-400 text-[11px]">JPG, GIF or PNG, 4MB max</span>
                        </div>
                    </div>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <Input
                            isRequired
                            name={"firstname"}
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            type="text"
                            label="Firstname"

                            labelPlacement={"outside"}
                            placeholder={"Enter firstname"}
                        />
                        <Input
                            isRequired
                            name={"lastname"}
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            type="text"
                            label="Lastname"
                            labelPlacement={"outside"}
                            placeholder={"Enter lastname"}
                        />
                    </div>
                    <div className={""}>
                        <Input
                            isRequired
                            name={"email"}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            type="email"
                            label="Email"
                            labelPlacement={"outside"}
                            placeholder={"Enter email"}
                        />
                    </div>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <Select
                            isRequired
                            name={"national"}
                            value={formik.values.national}
                            onChange={formik.handleChange}
                            label="National"
                            labelPlacement={"outside"}
                            placeholder={"Select nationality"}>

                        </Select>
                        <Input
                            isRequired
                            name={"placeOfBirth"}
                            value={formik.values.placeOfBirth}
                            onChange={formik.handleChange}
                            type="text"
                            label="Place of birth"
                            labelPlacement={"outside"}
                            placeholder={"Enter place of birth"}
                        />
                    </div>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <Input
                            isRequired
                            name={"dateOfBirth"}
                            value={formik.values.dateOfBirth}
                            onChange={formik.handleChange}
                            type="date"
                            label="Date of birth"
                            labelPlacement={"outside"}
                            placeholder={"Enter date of birth"}
                        />
                        <Select
                            isRequired
                            name={"sex"}
                            value={formik.values.sex}
                            onChange={formik.handleChange}
                            label="Sex"
                            labelPlacement={"outside"}
                            placeholder={"Select sex (male or female)"}>
                            <SelectItem key={"male"}>Male</SelectItem>
                            <SelectItem key={"female"}>Female</SelectItem>
                        </Select>
                    </div>
                </div>
            </div>

            {/*==========Section 2================*/}
            <div className={"grid md:grid-cols-2 grid-cols-1 gap-4"} style={{gridTemplateColumns: "25% auto"}}>
                <div className={"flex flex-col"}>
                    <h1 className="font-bold text-sm">Passwords</h1>
                    <span className="text-content4 text-sm">Enter or generate password for student</span>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <Input
                            isRequired
                            type="text"
                            label="Password"
                            labelPlacement={"outside"}
                            placeholder={"Enter password"}
                        />
                        <Input
                            isRequired
                            type="text"
                            label="Confirm password"
                            labelPlacement={"outside"}
                            placeholder={"Repeat password"}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <Button type={"submit"} color={"default"}>Cancel</Button>
                <Button type={"submit"} color={"primary"}>Create</Button>
            </div>
        </div>
    );
};
