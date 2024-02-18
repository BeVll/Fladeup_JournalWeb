import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip, cn,
    Divider, Dropdown, DropdownItem, DropdownMenu,
    DropdownTrigger,
    Image, Input, Link,
    Listbox,
    ListboxItem, Modal, ModalBody, ModalContent, ModalHeader, Spinner, Tooltip
} from "@nextui-org/react";
import {MdEditSquare, MdPhotoCamera} from "react-icons/md";
import {useCallback, useEffect, useState} from "react";
import {IStudentDetail} from "../types/students.ts";
import StudentApi from "../api/StudentApi.ts";
import {BsCalendar2HeartFill} from "react-icons/bs";
import {FaFemale, FaMale} from "react-icons/fa";
import {InformationItem} from "./InformationItem.tsx";
import {IoMdAddCircle} from "react-icons/io";
import {FaPeopleGroup} from "react-icons/fa6";
import {Search, ThreeDotsVertical} from "react-bootstrap-icons";
import {EyeFilledIcon} from "../../../assets/icons/EyeFilledIcon.tsx";
import {EditDocumentIcon} from "../../../assets/icons/EditDocumentIcon.tsx";
import {DeleteDocumentIcon} from "../../../assets/icons/DeleteDocumentIcon.tsx";
import {useTheme} from "next-themes";
import {AddToGroup} from "./AddToGroup.tsx";

export const ViewStudent = () => {
    const { id } = useParams()
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [student, setStudent] = useState<IStudentDetail>();
    const [isOpenAddGroup, setOpenAddGroup] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const { theme, setTheme } = useTheme();
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(id);
        getStudent();
        console.log(student);

    }, []);

    const getStudent = () => {
        if(id){
            setLoading(true);
            StudentApi.getDetailedStudent(id).then(res => {
                setStudent(res.data);
                setLoading(false);
            })
        }
    }

    const removeFromGroup = (groupId: number) => {
        if(student){
            StudentApi.removeFromGroup(groupId, student.id).then(res => {
                setStudent(res.data);
                getStudent();
            })
        }

    }
    return (
            isLoading ? <Spinner/> :
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
                                    <Chip variant={"flat"} size={"sm"}
                                          color={student?.status.toLowerCase() == "student" ? "primary" : "danger"}>
                                        {student?.status}
                                    </Chip>
                                    <Chip variant={"flat"} size="sm">
                                        <span className="">{student?.national}</span>
                                    </Chip>
                                    <Chip variant={"flat"} size="sm">
                                        <div className="flex flex-row items-center gap-1">
                                            {student?.sex.toLowerCase() == "male" && <FaMale/>}
                                            {student?.sex.toLowerCase() == "female" && <FaFemale/>}
                                            <span className="font-medium"> {student?.sex}</span>
                                        </div>
                                    </Chip>
                                </div>
                                <Chip variant={"flat"} size="sm">
                                    <div className="flex flex-row items-center gap-1">
                                        <BsCalendar2HeartFill/>
                                        <span
                                            className="font-medium"> {student?.dateOfBirth.toString()}, {student?.placeOfBirth}</span>
                                    </div>

                                </Chip>

                            </div>
                        </div>
                        <Button startContent={<MdEditSquare/>} color={"primary"}>Edit</Button>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-3  grid-cols-1 w-full">
                        <Card shadow={"none"} className="border-default-100 border">
                            <CardHeader>
                                <h1 className="font-bold">Personal information</h1>
                            </CardHeader>
                            <Divider/>
                            <CardBody>
                                <InformationItem title={"Email"} text={student?.email}/>
                                <InformationItem title={"Passport"} text={student?.passport}/>
                                <InformationItem title={"Indetification code"} text={student?.indetificateCode}/>
                                <InformationItem title={"Bank account"} text={student?.bankAccount}/>
                            </CardBody>
                        </Card>
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
                        <Card shadow={"none"} className="border-default-100 border col-start-1">
                            <CardHeader className="flex justify-between">
                                <div className="font-bold flex items-center gap-2"><FaPeopleGroup size={20}/> Groups
                                </div>
                                <Button startContent={<IoMdAddCircle/>} onPress={() => {
                                    setOpenAddGroup(true)
                                }}>Add</Button>
                            </CardHeader>
                            <Divider/>
                            <CardBody>
                                {student?.groups.map(group => {
                                    return (
                                        <div key={group.id}
                                             className="flex flex-row items-center justify-between w-full">

                                            <Link href={"/groups/view/" + group.id} color={"foreground"}
                                                  underline={"hover"}>
                                                {group.name}
                                            </Link>
                                            <div className="relative flex items-center gap-2">
                                                <Tooltip closeDelay={0} content="Details">
                                                    <Button isIconOnly size={"sm"} variant={"light"}
                                                            onPress={() => navigate("/groups/view/"+group.id)}
                                                            className="text-lg text-danger cursor-pointer active:opacity-50">
                                                        <EyeFilledIcon className={iconClasses}/>
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip closeDelay={0} color="danger" content="Remove from group">
                                                    <Button isIconOnly size={"sm"} variant={"light"}
                                                            onPress={() => removeFromGroup(group.id)}
                                                            className="text-lg text-danger cursor-pointer active:opacity-50">
                                                        <DeleteDocumentIcon className={cn(iconClasses, "text-danger")}/>
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    )
                                })}

                            </CardBody>
                        </Card>
                    </div>
                    <AddToGroup isOpen={isOpenAddGroup} onOpenChange={setOpenAddGroup} onAdded={getStudent} student={student}/>
                </div>
    );
};
