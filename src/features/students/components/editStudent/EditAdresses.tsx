import {Button, CardBody, Input, Spinner} from "@nextui-org/react";
import {CustomCard} from "../../../../components/CustomCard.tsx";
import {IStudentAddresses, IStudentCreate, IStudentDetail, IStudentUpdateAddresses} from "../../types/students.ts";
import * as Yup from "yup";
import {useFormik} from "formik";
import StudentApi from "../../api/StudentApi.ts";
import {useEffect, useState} from "react";
import {number} from "yup";
import {Bounce, toast, ToastContainer} from "react-toastify";

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
            <CardBody className={"min-h-[300px] flex-col justify-center relative"}>

                {
                    isLoading ? <Spinner/> :
                        <form onSubmit={formik.handleSubmit}>
                            <div className={"grid grid-cols-2 gap-4"}>
                                <div className={"flex flex-col gap-2 max-w-[500px]"}>
                                    <h1 className={"font-bold text-[20px]"}>Address</h1>
                                    <Input name={"country"} value={formik.values.country} onChange={formik.handleChange}
                                           size={"sm"} label={"Country"}/>
                                    <Input name={"city"} value={formik.values.city} onChange={formik.handleChange}
                                           size={"sm"} label={"City"}/>
                                    <Input name={"street"} value={formik.values.street} onChange={formik.handleChange}
                                           size={"sm"} label={"Street"}/>
                                    <Input name={"postalCode"} value={formik.values.postalCode}
                                           onChange={formik.handleChange} size={"sm"} label={"Postal code"}/>
                                </div>
                                <div className={"flex flex-col gap-2 max-w-[500px]"}>
                                    <h1 className={"font-bold text-[20px]"}>Mail address</h1>
                                    <Input name={"mailCountry"} value={formik.values.mailCountry}
                                           onChange={formik.handleChange} size={"sm"} label={"Country"}/>
                                    <Input name={"mailCity"} value={formik.values.mailCity}
                                           onChange={formik.handleChange} size={"sm"} label={"City"}/>
                                    <Input name={"mailStreet"} value={formik.values.mailStreet}
                                           onChange={formik.handleChange} size={"sm"} label={"Street"}/>
                                    <Input name={"mailPostalCode"} value={formik.values.mailPostalCode}
                                           onChange={formik.handleChange} size={"sm"} label={"Postal code"}/>
                                </div>
                                <Button color={"primary"} type={"submit"}
                                        className={"col-start-1 col-end-3"}>Save</Button>
                            </div>

                        </form>
                }

            </CardBody>
        </CustomCard>
    );
};
