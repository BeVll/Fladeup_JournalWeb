import {useParams, useSearchParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, Chip, Divider, Image} from "@nextui-org/react";
import {MdEditSquare, MdPhotoCamera} from "react-icons/md";
import {useEffect, useState} from "react";
import {IStudentDetail} from "../types/students.ts";
import StudentApi from "../api/StudentApi.ts";
import {BsCalendar2HeartFill} from "react-icons/bs";
import {FaFemale, FaMale} from "react-icons/fa";
import {InformationItem} from "./InformationItem.tsx";

export const ViewStudent = () => {
    const { id } = useParams()

    const [student, setStudent] = useState<IStudentDetail>();

    useEffect(() => {
        console.log(id);
        if(id){
            StudentApi.getDetailedStudent(id).then(res => {
                setStudent(res.data);
            })
        }
        console.log(student);

    }, []);
    return (
        <div className="gap-4 flex-col flex">
            <div className="flex md:flex-row flex-col gap-3 justify-between">
                <div className={"flex gap-4 "}>
                    {student?.image ?
                        <Image className="rounded w-full h-[140px] object-cover w-[105px]"
                               src={import.meta.env.VITE_STORAGE_URL + student?.image}/>
                        :
                        <div
                            className="border-2 rounded-xl p-4 border-content3 flex items-center h-[140px] w-[105px]">
                            <MdPhotoCamera className="text-default-300 "
                                           size={100}/>
                        </div>

                    }
                    <div className="flex flex-col gap-2">

                        <span className="font-bold text-xl ">{student?.firstname} {student?.lastname} </span>

                        <div className={"flex gap-2"}>
                            <Chip size={"sm"} color={"primary"}>
                                <span>#{student?.id}</span>
                            </Chip>
                            <Chip variant={"flat"} size="sm">
                                <span className="">{student?.national}</span>
                            </Chip>
                            <Chip variant={"flat"} size="sm">
                                <div className="flex flex-row items-center gap-1">
                                    {student?.sex.toLowerCase() == "male" && <FaMale />}
                                    {student?.sex.toLowerCase() == "female" && <FaFemale />}
                                    <span className="font-medium"> {student?.sex}</span>
                                </div>
                            </Chip>
                        </div>
                        <Chip variant={"flat"} size="sm">
                            <div className="flex flex-row items-center gap-1">
                                <BsCalendar2HeartFill/>
                                <span className="font-medium"> {student?.dateOfBirth.toString()}, {student?.placeOfBirth}</span>
                            </div>

                        </Chip>

                    </div>
                </div>
                <Button startContent={<MdEditSquare />} color={"primary"}>Edit</Button>
            </div>
            <div className="grid gap-4 lg:grid-cols-3  grid-cols-1 w-full">
                <Card shadow={"none"} className=" border-default-100 border">
                    <CardHeader className="flex justify-between">
                        <h1 className="font-bold">Address</h1>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <InformationItem title={"Country"} text={"Ukraine"}/>
                        <InformationItem title={"City"} text={"Tsuman"}/>
                        <InformationItem title={"Street"} text={"Bohdana Kmelnystkiego, 25"}/>
                        <InformationItem title={"Postal code"} text={"45656"}/>
                    </CardBody>
                </Card>
                <Card shadow={"none"} className="border-default-100 border">
                    <CardHeader>
                        <h1 className="font-bold">Mail address</h1>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <InformationItem title={"Country"} text={"Poland"}/>
                        <InformationItem title={"City"} text={"Lublin"}/>
                        <InformationItem title={"Street"} text={"Sokola, 13/47"}/>
                        <InformationItem title={"Postal code"} text={"45656"}/>
                    </CardBody>
                </Card>
                <Card shadow={"none"} className="border-default-100 border">
                    <CardHeader>
                        <h1 className="font-bold">Mail address</h1>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <InformationItem title={"Country"} text={"Poland"}/>
                        <InformationItem title={"City"} text={"Lublin"}/>
                        <InformationItem title={"Street"} text={"Sokola, 13/47"}/>
                        <InformationItem title={"Postal code"} text={"45656"}/>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};
