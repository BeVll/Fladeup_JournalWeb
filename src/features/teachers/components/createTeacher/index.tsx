import {Button, Image, Input, Select, SelectItem, Tooltip} from "@nextui-org/react";
import {MdPhotoCamera} from "react-icons/md";
import * as Yup from "yup";
import {useFormik} from "formik";
import {IGenderModel, INationalityModel, IStudentCreate} from "../../types/students.ts";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import TeacherApi from "../../api/TeacherApi.ts";
import {useNavigate} from "react-router-dom";
import StudentApi from "../../../students/api/StudentApi.ts";

export const CreateTeacher = () => {
    const [image, setImage] = useState<string | undefined>();
    const fileInputRef=useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [nationalities, setNationalities] = useState<INationalityModel[]>([]);
    const [genders, setGenders] = useState<IGenderModel[]>([])

    useEffect(() => {
        StudentApi.getGenders().then(res => {
            setGenders(res.data);
        });

        StudentApi.getNationalities().then(res => {
            setNationalities(res.data);
        });
    }, []);

    const onFileSelected = (file: File): string | ArrayBuffer | null => {

        var reader = new FileReader();

        reader.onload = function(event:ProgressEvent<FileReader>) {
            console.log(event.target.result);
            setImage(event.target.result);
        };

        reader.readAsDataURL(file);
        return "";
    }
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            return;
        }

        const file = files.item(0);

        if (file) {
            // Check file type
            if (!/^image\/(jpeg|png|gif)$/.test(file.type)) {
                alert('Please select a valid image file (JPG, PNG, or GIF).');
                return;
            }

            // Check file size (max size: 4MB)
            const maxSize = 4 * 1024 * 1024; // 4MB in bytes
            if (file.size > maxSize) {
                alert('File size exceeds the allowed limit (4MB).');
                return;
            }

            // Wait for the file to be processed
                const reader = new FileReader();

                reader.onload = (e) => {
                    formik.setFieldValue('image', file);
                    onFileSelected(file);
                };

                reader.readAsDataURL(file);
        }
    };

    const SignupSchema = Yup.object().shape({
        firstname: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const initialValues: IStudentCreate = {
        firstname: "",
        lastname: "",
        image: new File([], ""),
        indetificateCode: "",
        dateOfBirth: new Date(),
        placeOfBirth: "",
        genderId: 1,
        nationalityId: 1,
        email: "",
        password: "",
        confirmPassword: "",
        passport: "",
        isLightTheme: false,
        instagram: "",
        facebook: "",
        twitter: "",
        bankAccount: ""
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            console.log(values);

            TeacherApi.createTeacher(values).then(res => {
                navigate("/teachers");
                formik.resetForm();
            })
        },
    });



    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={"flex flex-col gap-10"}>

                {/*==========Section 1================*/}
                <div className={"grid md:grid-cols-2 grid-cols-1 gap-4"} style={{gridTemplateColumns: "25% auto"}}>
                    <div className={"flex flex-col"}>
                        <h1 className="font-bold text-sm">Personal Information</h1>
                        <span className="text-content4 text-sm">Enter personal information of teacher like firstname, lastname, email, place of birth, date of birth and others..</span>
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <div className={"flex gap-4"}>
                            {image ?
                                <Image className="rounded w-full h-[140px] object-cover w-[105px]"
                                       src={image}/>
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
                                        ref={fileInputRef}
                                        accept="image/jpeg, image/png, image/gif"
                                        description={formik.errors.image}
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="upload-image" // <-- Make sure this matches htmlFor in the label
                                    />
                                    <Button type={"button"} size={"sm"} color={"primary"}
                                            onClick={() => fileInputRef.current && fileInputRef.current.click()}
                                            className="w-fit cursor-pointer">
                                        Change avatar
                                    </Button>
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
                                description={formik.errors.firstname}
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
                                description={formik.errors.lastname}
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
                                description={formik.errors.email}
                                type="email"
                                label="Email"
                                labelPlacement={"outside"}
                                placeholder={"Enter email"}
                            />
                        </div>
                        <div className={"grid grid-cols-2 gap-4"}>
                            <Select
                                isRequired
                                name={"nationalityId"}
                                value={formik.values.nationalityId}
                                onChange={formik.handleChange}
                                description={formik.errors.nationalityId}
                                label="National"
                                labelPlacement={"outside"}
                                placeholder={"Select nationality"}>
                                {
                                    nationalities.map(nat => (
                                        <SelectItem key={nat.id} value={nat.id}>{nat.nameEn}</SelectItem>
                                    ))
                                }
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
                                value={formik.values.dateOfBirth.toString()}
                                onChange={formik.handleChange}
                                description={formik.errors.dateOfBirth}
                                type="date"
                                label="Date of birth"
                                labelPlacement={"outside"}
                                placeholder={"Enter date of birth"}
                            />
                            <Select
                                isRequired
                                name={"genderId"}
                                value={formik.values.genderId}
                                onChange={formik.handleChange}
                                description={formik.errors.genderId}
                                label="Gender"
                                labelPlacement={"outside"}
                                placeholder={"Select gender"}>
                                {
                                    genders.map(gender => (
                                        <SelectItem key={gender.id} value={gender.id}>{gender.nameEn}</SelectItem>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>
                </div>

                {/*==========Section 2================*/}
                <div className={"grid md:grid-cols-2 grid-cols-1 gap-4"} style={{gridTemplateColumns: "25% auto"}}>
                    <div className={"flex flex-col"}>
                        <h1 className="font-bold text-sm">Passwords</h1>
                        <span className="text-content4 text-sm">Enter or generate password for teacher</span>
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <div className={"grid grid-cols-2 gap-4"}>
                            <Input
                                isRequired
                                type="text"
                                label="Password"
                                name={"password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                description={formik.errors.password}
                                labelPlacement={"outside"}
                                placeholder={"Enter password"}
                            />
                            <Input
                                isRequired
                                type="text"
                                label="Confirm password"
                                name={"confirmPassword"}
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                description={formik.errors.confirmPassword}
                                labelPlacement={"outside"}
                                placeholder={"Repeat password"}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <Button  color={"default"}>Cancel</Button>
                    <Button type={"submit"} color={"primary"}>Create</Button>
                </div>
            </div>
        </form>

    );
};
