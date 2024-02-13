import {useParams, useSearchParams} from "react-router-dom";
import {Button, Chip, Image} from "@nextui-org/react";
import {MdEditSquare, MdPhotoCamera} from "react-icons/md";
import {useEffect, useState} from "react";
import {IStudentDetail} from "../types/students.ts";
import StudentApi from "../api/StudentApi.ts";

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
        <div className="">
            <div className="flex justify-between">
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
                    <div className="flex flex-col gap-2 ">

                        <span className="font-bold text-2xl text-center">{student?.firstname} {student?.lastname} <Chip size={"sm"} color={"primary"}>
                            <span>#{student?.id}</span>
                        </Chip></span>

                        <div className={"flex gap-2"}>

                            <Chip size="sm">
                                <span className="">{student?.national}</span>
                            </Chip>
                            <Chip size="sm">
                                <span className="">{student?.sex}</span>
                            </Chip>
                        </div>


                    </div>
                </div>
                <Button startContent={<MdEditSquare />} color={"primary"}>Edit</Button>
            </div>
        </div>
    );
};
