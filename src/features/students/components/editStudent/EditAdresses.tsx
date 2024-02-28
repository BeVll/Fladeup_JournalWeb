import {Button, CardBody, Image, Input, Select, SelectItem, Spinner} from "@nextui-org/react";
import {CustomCard} from "../../../../components/CustomCard.tsx";
import {IStudentAddresses, IStudentCreate, IStudentDetail, IStudentUpdateAddresses} from "../../types/students.ts";
import * as Yup from "yup";
import {useFormik} from "formik";
import StudentApi from "../../api/StudentApi.ts";
import {useEffect, useState} from "react";
import {number} from "yup";
import {Bounce, toast, ToastContainer} from "react-toastify";
import {MdPhotoCamera} from "react-icons/md";

export const EditAdresses = ({id}:{id:number}) => {
    const [addresses, setAddresses] = useState<IStudentAddresses>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const notify = () => toast.success('Saved   !');

    useEffect(() => {
        getAddresses();
    }, []);



    const SignupSchema = Yup.object().shape({

    });

    const initialValues: IStudentUpdateAddresses = {
        country: addresses?.country,
        city: addresses?.city,
        street: addresses?.street,
        postalCode: addresses?.postalCode,
        mailCountry: addresses?.mailCountry,
        mailCity: addresses?.mailCity,
        mailStreet: addresses?.mailStreet,
        mailPostalCode: addresses?.mailPostalCode
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            console.log(values);

            StudentApi.updateAddresses(values, id.toString()).then(res => {
                getAddresses();
                notify();
                formik.resetForm();
            })
        },
    });
    const getAddresses = () => {
        setLoading(true);
        StudentApi.getAddresses(id.toString()).then(res => {
            setAddresses(res.data);
            formik.setValues(res.data);
            setLoading(false);
        });

    }
    return (
        <CustomCard>
            <CardBody className={"min-h-[300px] flex-col justify-center relative p-4"}>

                {
                    isLoading ? <Spinner/> :
                        <form onSubmit={formik.handleSubmit}>
                            <div className={"flex flex-col gap-4"}>
                                {/*==========Section 1================*/}
                                <div className={"grid md:grid-cols-3 grid-cols-1 gap-4"}
                                     style={{gridTemplateColumns: "25% auto"}}>
                                    <div className={"flex flex-col"}>
                                        <h1 className="font-bold text-sm">Addresses Information</h1>
                                        <span className="text-content4 text-sm">Address of permanent residence and address for receiving mail</span>
                                    </div>
                                    <div className={"grid-cols-2 grid gap-8"}>
                                        <div className={"flex flex-col gap-4 "}>
                                            <h1 className={"font-bold text-[20px]"}>Address</h1>
                                            <Input name={"country"} value={formik.values.country}
                                                   onChange={formik.handleChange}
                                                   label={"Country"} labelPlacement={"outside"}
                                                   placeholder={"Enter student country"}/>
                                            <Input name={"city"} value={formik.values.city}
                                                   onChange={formik.handleChange}
                                                   label={"City"} labelPlacement={"outside"}
                                                   placeholder={"Enter student country"}/>
                                            <Input name={"street"} value={formik.values.street}
                                                   onChange={formik.handleChange}
                                                   label={"Street"} labelPlacement={"outside"}
                                                   placeholder={"Enter student country"}/>
                                            <Input name={"postalCode"} value={formik.values.postalCode}
                                                   onChange={formik.handleChange} label={"Postal code"}
                                                   labelPlacement={"outside"}
                                                   placeholder={"Enter student country"}/>
                                        </div>
                                        <div className={"flex flex-col gap-4 ju"}>
                                            <h1 className={"font-bold text-[20px]"}>Mail address</h1>
                                            <Input name={"mailCountry"} value={formik.values.mailCountry}
                                                   onChange={formik.handleChange} label={"Country"}
                                                   labelPlacement={"outside"}
                                                   placeholder={"Enter student country"}/>
                                            <Input name={"mailCity"} value={formik.values.mailCity}
                                                   onChange={formik.handleChange} label={"City"}
                                                   labelPlacement={"outside"}
                                                   placeholder={"Enter student country"}/>
                                            <Input name={"mailStreet"} value={formik.values.mailStreet}
                                                   onChange={formik.handleChange} label={"Street"}
                                                   labelPlacement={"outside"}
                                                   placeholder={"Enter student country"}/>
                                            <Input name={"mailPostalCode"} value={formik.values.mailPostalCode}
                                                   onChange={formik.handleChange} label={"Postal code"}
                                                   labelPlacement={"outside"}
                                                   placeholder={"Enter student country"}/>
                                        </div>
                                    </div>
                                </div>
                                {/*==========Section 2================*/}

                                <div className="flex justify-end gap-4">
                                    <Button color={"default"}>Cancel</Button>
                                    <Button type={"submit"} color={"primary"}>Save</Button>
                                </div>
                            </div>
            </form>
            }

        </CardBody>
</CustomCard>
)
    ;
};
