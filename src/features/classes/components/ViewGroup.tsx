import {useParams, useSearchParams} from "react-router-dom";
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
import GroupApi from "../api/GroupApi.ts";
import {IGroupDetailed} from "../types/groups.ts";
import {CustomCard} from "../../../components/CustomCard.tsx";

export const ViewGroup = () => {
    const { id } = useParams()
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [group, setGroup] = useState<IGroupDetailed>();
    const [isOpenAddGroup, setOpenAddGroup] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const { theme, setTheme } = useTheme();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        console.log(id);
        getGroup();
        console.log(group);

    }, []);

    const getGroup = () => {
        if(id){
            setLoading(true);
            GroupApi.getDetailedGroup(id).then(res => {
                setGroup(res.data);
                setLoading(false);
            })
        }
    }

    const removeFromGroup = (groupId: number) => {
        if(group){

        }

    }
    return (
        isLoading ? <Spinner/> :
            <div className="gap-4 flex-col flex">
                <CustomCard>
                    <CardBody className="p-4">
                        <div className="flex md:flex-row flex-col gap-3 justify-between">
                            <div className={"flex gap-4 "}>
                                <div className="flex flex-col gap-2">

                                    <span className="font-bold text-xl ">{group?.name} </span>

                                    <div className={"flex gap-2"}>

                                        <Chip size={"sm"} color={"primary"}>
                                            <span>#{group?.id}</span>
                                        </Chip>

                                        <Chip variant={"flat"} size="sm">
                                            <span className="">{group?.formOfStudy}</span>
                                        </Chip>

                                    </div>


                                </div>
                            </div>
                            <Button startContent={<MdEditSquare/>} color={"primary"}>Edit</Button>
                        </div>
                        <div className="grid gap-4 lg:grid-cols-3  grid-cols-1 w-full">

                        </div>

                    </CardBody>
                </CustomCard>
                <div className={"grid grid-cols-2 gap-4"} style={{gridTemplateColumns: "35% auto"}}>
                    <CustomCard className="">
                        <CardHeader className="flex justify-between p-4">
                            <div className="font-bold flex items-center gap-2"><FaPeopleGroup size={20}/> Groups
                            </div>
                            <Button startContent={<IoMdAddCircle/>} onPress={() => {
                                setOpenAddGroup(true)
                            }}>Add</Button>
                        </CardHeader>
                        <Divider/>
                        <CardBody className="p-4">
                            {
                                group?.subjects
                                    ?
                                    group?.subjects.map(subject => {
                                        return (
                                            <div key={subject.id}
                                                 className="flex flex-row items-center justify-between w-full">
                                                <Link href={"/groups/view/" + subject.id} color={"foreground"}
                                                      underline={"hover"}>
                                                    {subject.name}
                                                </Link>
                                                <div className="relative flex items-center gap-2">
                                                    <Tooltip content="Details">
                                                  <span
                                                      className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EyeFilledIcon className={iconClasses}/>
                                                  </span>
                                                    </Tooltip>
                                                    <Tooltip closeDelay={0} color="danger"
                                                             content="Remove from group">
                                                        <Button isIconOnly size={"sm"} variant={"light"}
                                                                onPress={() => removeFromGroup(subject.id)}
                                                                className="text-lg text-danger cursor-pointer active:opacity-50">
                                                            <DeleteDocumentIcon
                                                                className={cn(iconClasses, "text-danger")}/>
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <span>No subjects</span>
                            }

                        </CardBody>
                    </CustomCard>
                    <CustomCard className="">
                        <CardHeader className="flex justify-between p-4">
                            <div className="font-bold flex items-center gap-2"><FaPeopleGroup size={20}/> Students
                            </div>
                            <Button startContent={<IoMdAddCircle/>} onPress={() => {
                                setOpenAddGroup(true)
                            }}>Add</Button>
                        </CardHeader>
                        <Divider/>
                        <CardBody className="p-4">
                            {
                                group?.subjects
                                    ?
                                    group?.subjects.map(subject => {
                                        return (
                                            <div key={subject.id}
                                                 className="flex flex-row items-center justify-between w-full">
                                                <Link href={"/groups/view/" + subject.id} color={"foreground"}
                                                      underline={"hover"}>
                                                    {subject.name}
                                                </Link>
                                                <div className="relative flex items-center gap-2">
                                                    <Tooltip content="Details">
                                                  <span
                                                      className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                    <EyeFilledIcon className={iconClasses}/>
                                                  </span>
                                                    </Tooltip>
                                                    <Tooltip closeDelay={0} color="danger"
                                                             content="Remove from group">
                                                        <Button isIconOnly size={"sm"} variant={"light"}
                                                                onPress={() => removeFromGroup(subject.id)}
                                                                className="text-lg text-danger cursor-pointer active:opacity-50">
                                                            <DeleteDocumentIcon
                                                                className={cn(iconClasses, "text-danger")}/>
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <span>No subjects</span>
                            }

                        </CardBody>
                    </CustomCard>
                </div>

            </div>
    );
};
