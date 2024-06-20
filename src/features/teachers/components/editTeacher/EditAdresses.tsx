import {Button, CardBody, Chip, Image, Input, Select, SelectItem, Spinner} from "@nextui-org/react";
import {CustomCard} from "../../../../components/CustomCard.tsx";
import {IStudentAddresses, IStudentCreate, IStudentDetail, IStudentUpdateAddresses} from "../../types/students.ts";
import * as Yup from "yup";
import {useFormik} from "formik";
import TeacherApi from "../../api/TeacherApi.ts";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export const EditTeacherAdresses = ({id}:{id:number}) => {
    const [addresses, setAddresses] = useState<IStudentAddresses>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const notify = () => toast.success('Saved!');
    const notifyError = () => toast.error('Error!');

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

            TeacherApi.updateAddresses(values, id.toString()).then(res => {
                getAddresses();
                notify();
                formik.resetForm();
            }).catch(() => {
                notifyError();
            });
        },
    });
    const getAddresses = () => {
        setLoading(true);
        TeacherApi.getAddresses(id.toString()).then(res => {
            setAddresses(res.data);
            formik.setValues(res.data);
            setLoading(false);
        }).catch(() => {
            notifyError();
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
                                <div className={"grid md:grid-cols-[20%_auto] grid-cols-1 gap-4"}>

                                    <div className={"flex flex-col"}>
                                        <h1 className="font-bold text-sm">Addresses Information</h1>
                                        <span className="text-content4 text-sm">Address of permanent residence and address for receiving mail</span>
                                    </div>
                                    <div className={"grid-cols-2 grid gap-8"}>
                                        <div className={"flex flex-col gap-4 "}>
                                            <Chip variant={"flat"} color={"primary"} className={"p-4"}>
                                                <h1 className={"font-bold text-[20px]"}>Address</h1>
                                            </Chip>
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
                                            <Chip variant={"flat"} color={"primary"} className={"p-4"}>
                                                <h1 className={"font-bold text-[20px]"}>Mail address</h1>
                                            </Chip>
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
