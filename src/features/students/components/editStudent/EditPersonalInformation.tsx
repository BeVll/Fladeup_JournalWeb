import {Button, CardBody, Image, Input, Select, SelectItem, Spinner} from "@nextui-org/react";
import {CustomCard} from "../../../../components/CustomCard.tsx";
import {
    IStudentUpdate, IStudentUpdateModel
} from "../../types/students.ts";
import * as Yup from "yup";
import {useFormik} from "formik";
import StudentApi from "../../api/StudentApi.ts";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {MdPhotoCamera} from "react-icons/md";

export const EditPersonalInformation = ({id}:{id:number}) => {
    const [student, setStudent] = useState<IStudentUpdateModel>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [image, setImage] = useState<string | undefined>(undefined);
    const fileInputRef=useRef<HTMLInputElement>(null);

    const onFileSelected = (file: File): string | ArrayBuffer | null => {

        const reader = new FileReader();

        reader.onload = function(event:ProgressEvent<FileReader>) {
            if(event.target && event.target.result)
                setImage(event.target.result.toString());

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
                formik.setFieldValue("image", undefined);
                formik.setFieldValue("newImage", file);
                onFileSelected(file);
            };

            reader.readAsDataURL(file);
        }
    };
    const notify = () => toast.success('Saved!');
    const notifyError = () => toast.error('Error!');
    useEffect(() => {
        getStudent();
    }, []);



    const SignupSchema = Yup.object().shape({

    });

    const initialValues: IStudentUpdate = {
        firstname: "",
        lastname: "",
        newImage: undefined,
        image: undefined,
        indetificateCode: "",
        dateOfBirth: new Date(),
        placeOfBirth: "",
        genderId: 1,
        nationalityId: 1,
        passport: "",
        bankAccount: "",
        status: ""
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            console.log(values);

            StudentApi.updateStudent(values, id.toString()).then(res => {
                getStudent();
                notify();
                formik.resetForm();
            }).catch(() => {
                notifyError();
            })
        },
    });
    const getStudent = () => {
        setLoading(true);
        StudentApi.getDetailedStudentUpdate(id.toString()).then(res => {
            const vals: IStudentUpdate = {
                firstname: res.data.firstname,
                lastname: res.data.lastname,
                newImage: undefined,
                image: res.data.image,
                indetificateCode: res.data.indetificateCode,
                dateOfBirth: res.data.dateOfBirth,
                placeOfBirth: res.data.placeOfBirth,
                genderId: res.data.gender.id,
                nationalityId: res.data.nationality.id,
                passport: res.data.passport,
                bankAccount: res.data.bankAccount,
                status: res.data.status
            }
            console.log(vals);
            setLoading(false);
            setStudent(res.data);
            formik.setValues(vals);

        }).catch(() => {
            notifyError();
        });
        formik.setFieldValue("genderId", student?.gender.id);
    }
    return (
        <CustomCard>
            <CardBody className={"min-h-[300px] flex-col justify-center relative p-4"}>

                {
                    isLoading || student == undefined ? <Spinner/> :
                        <form onSubmit={formik.handleSubmit}>
                            <div className={"flex flex-col gap-4"}>
                                {/*==========Section 1================*/}
                                <div className={"grid md:grid-cols-[20%_auto] grid-cols-1 gap-4"}>

                                    <div className={"flex flex-col"}>
                                        <h1 className="font-bold text-sm">Personal Information</h1>
                                        <span className="text-content4 text-sm">Enter personal information of student like firstname, lastname, email, place of birth, date of birth and others..</span>
                                    </div>
                                    <div className={"flex flex-col gap-4"}>
                                        <div className={"flex gap-4"}>
                                            {image && image != "" &&
                                                <Image className="rounded w-full h-[140px] object-cover w-[105px]"
                                                       src={image}/>
                                            }
                                            {formik.values.image != "" && image == undefined &&
                                                <Image className="rounded w-full h-[140px] object-cover w-[105px]"
                                                       src={import.meta.env.VITE_STORAGE_URL + formik.values.image}/>


                                            }
                                            {
                                                formik.values.image == "" && image == undefined &&
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
                                                <span
                                                    className="text-default-400 text-[11px]">JPG, GIF or PNG, 4MB max</span>
                                            </div>
                                        </div>
                                        <div className={"grid grid-cols-2 gap-8"}>
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
                                        <div className={"grid grid-cols-2 gap-8"}>
                                            <Select
                                                isRequired
                                                name={"nationalityId"}

                                                value={formik.values.nationalityId}
                                                onChange={formik.handleChange}
                                                description={formik.errors.nationalityId}
                                                label="National"
                                                defaultSelectedKeys={[student.nationality.id.toString()]}
                                                labelPlacement={"outside"}
                                                placeholder={"Select nationality"}>
                                                {student.nationalities.map((nat) => (
                                                    <SelectItem key={nat.id} value={nat.id}>
                                                        {nat.nameEn}
                                                    </SelectItem>
                                                ))}
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
                                        <div className={"grid grid-cols-2 gap-8"}>
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
                                                defaultSelectedKeys={[student.gender.id.toString()]}
                                                placeholder={"Select gender"}>
                                                {student.genders.map((gender) => (
                                                    <SelectItem key={gender.id} value={gender.id}>
                                                        {gender.nameEn}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                {/*==========Section 2================*/}

                                <div className="flex justify-end gap-4">
                                    <Button type={"submit"} color={"primary"}>Save</Button>
                                </div>
                            </div>

                        </form>
                }

            </CardBody>
        </CustomCard>
    );
};
