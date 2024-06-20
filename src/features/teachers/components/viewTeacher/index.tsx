import {useNavigate} from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip, cn,
    Divider,
    Image, Link, Spinner, Tooltip
} from "@nextui-org/react";
import {MdEditSquare, MdPhotoCamera} from "react-icons/md";
import {useEffect, useState} from "react";
import {IteacherDetail} from "../../types/teachers.ts";
import TeacherApi from "../../api/TeacherApi.ts";
import {BsCalendar2HeartFill} from "react-icons/bs";
import {FaFemale, FaMale} from "react-icons/fa";
import {InformationItem} from "./InformationItem.tsx";
import {IoMdAddCircle} from "react-icons/io";
import {FaPeopleGroup} from "react-icons/fa6";
import {EyeFilledIcon} from "../../../../assets/icons/EyeFilledIcon.tsx";
import {CustomCard} from "../../../../components/CustomCard.tsx";
import {IStudentAddresses} from "../../types/students.ts";

export const ViewTeacher = ({id}:{id:string | undefined }) => {

    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [teacher, setteacher] = useState<IteacherDetail>();
    const [addresses, setAddresses] = useState<IStudentAddresses>();
    const [isOpenAddGroup, setOpenAddGroup] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(id);
        getTeacher();
        console.log(teacher);

    }, []);

    const getTeacher = () => {
        if(id){
            setLoading(true);
            TeacherApi.getDetailedTeacher(id).then(res => {
                setteacher(res.data);
                setLoading(false);
            })
            TeacherApi.getAddresses(id).then(res => {
                setAddresses(res.data);
                setLoading(false);
            })
        }
    }

    return (
            isLoading && teacher == undefined ? <Spinner/> :
                <CustomCard>
                    <CardBody className="p-4">
                        <div className="gap-4 flex-col flex">
                            <div className="flex md:flex-row flex-col gap-3 justify-between">
                                <div className={"flex gap-4 "}>
                                    {teacher?.image ?
                                        <Image className="rounded w-full h-[140px] object-cover w-[105px]"
                                            // @ts-expect-error
                                               src={import.meta.env.VITE_STORAGE_URL + teacher?.image}/>
                                        :
                                        <div
                                            className="border-2 rounded-xl p-4 border-content3 flex items-center h-[140px] w-[105px]">
                                            <MdPhotoCamera className="text-default-300 "
                                                           size={100}/>
                                        </div>

                                    }
                                    <div className="flex flex-col gap-2">

                                        <span
                                            className="font-bold text-xl ">{teacher?.firstname} {teacher?.lastname} </span>

                                        <div className={"flex gap-2"}>

                                            <Chip size={"sm"} color={"primary"}>
                                                <span>#{teacher?.id}</span>
                                            </Chip>
                                            <Chip variant={"flat"} size={"sm"}
                                                  color={teacher?.status.toLowerCase() == "teacher" ? "primary" : "danger"}>
                                                {teacher?.status}
                                            </Chip>
                                            <Chip variant={"flat"} size="sm">
                                                <span className="">{teacher?.nationality.nameEn}</span>
                                            </Chip>
                                            <Chip variant={"flat"} size="sm">
                                                <div className="flex flex-row items-center gap-1">
                                                    {teacher?.gender.nameEn.toLowerCase() == "male" && <FaMale/>}
                                                    {teacher?.gender.nameEn.toLowerCase() == "female" && <FaFemale/>}
                                                    <span className="font-medium"> {teacher?.gender.nameEn}</span>
                                                </div>
                                            </Chip>
                                        </div>
                                        <Chip variant={"flat"} size="sm">
                                            <div className="flex flex-row items-center gap-1">
                                                <BsCalendar2HeartFill/>
                                                <span
                                                    className="font-medium"> {teacher?.dateOfBirth.toString()}, {teacher?.placeOfBirth}</span>
                                            </div>

                                        </Chip>

                                    </div>
                                </div>
                                <Button startContent={<MdEditSquare/>} onPress={() => {navigate("/teachers/edit/"+teacher?.id)}} color={"primary"}>Edit</Button>
                            </div>
                            <div className="grid gap-4 lg:grid-cols-3  grid-cols-1 w-full">
                                <Card shadow={"none"} className="border-default-100 border">
                                    <CardHeader>
                                        <h1 className="font-bold">Personal information</h1>
                                    </CardHeader>
                                    <Divider/>
                                    <CardBody>
                                        <InformationItem title={"Email"} text={teacher?.email}/>
                                        <InformationItem title={"Passport"} text={teacher?.passport}/>
                                        <InformationItem title={"Indetification code"}
                                                         text={teacher?.indetificateCode}/>
                                        <InformationItem title={"Bank account"} text={teacher?.bankAccount}/>
                                    </CardBody>
                                </Card>
                                <Card shadow={"none"} className=" border-default-100 border">
                                    <CardHeader className="flex justify-between">
                                        <h1 className="font-bold">Address</h1>
                                    </CardHeader>
                                    <Divider/>
                                    <CardBody>
                                        <InformationItem title={"Country"} text={addresses?.country}/>
                                        <InformationItem title={"City"} text={addresses?.city}/>
                                        <InformationItem title={"Street"} text={addresses?.street}/>
                                        <InformationItem title={"Postal code"} text={addresses?.postalCode}/>
                                    </CardBody>
                                </Card>
                                <Card shadow={"none"} className="border-default-100 border">
                                    <CardHeader>
                                        <h1 className="font-bold">Mail address</h1>
                                    </CardHeader>
                                    <Divider/>
                                    <CardBody>
                                        <InformationItem title={"Country"} text={addresses?.mailCountry}/>
                                        <InformationItem title={"City"} text={addresses?.mailCity}/>
                                        <InformationItem title={"Street"} text={addresses?.mailStreet}/>
                                        <InformationItem title={"Postal code"} text={addresses?.mailPostalCode}/>
                                    </CardBody>
                                </Card>

                            </div>

                        </div>
                    </CardBody>
                </CustomCard>


    );
};
