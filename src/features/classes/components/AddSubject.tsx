import {
    Button, Card, CardBody, Chip,
    Divider, Image,
    Input,
    Listbox,
    ListboxItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader, Select, SelectItem, Tooltip
} from "@nextui-org/react";
import {Search} from "react-bootstrap-icons";
import {IGroupUpdate, IStudentDetail} from "../types/students.ts";
import {Key, useCallback, useEffect, useState} from "react";
import StudentApi from "../api/StudentApi.ts";
import {PagedResponse} from "../../../lib/types/types.ts";
import {IGroupDetailed, IGroupModel} from "../../classes/types/groups.ts";
import GroupApi from "../../classes/api/GroupApi.ts";
import {IoIosRemove, IoIosSchool, IoMdAdd, IoMdAddCircle} from "react-icons/io";
import {ISubjectModel} from "../../subjects/types/subjects.ts";
import SubjectApi from "../../subjects/api/SubjectApi.ts";
import {IStudentModel} from "../../students/types/students.ts";
import {MdPhotoCamera} from "react-icons/md";
import {FaExchangeAlt} from "react-icons/fa";

export const AddSubject = ({ isOpen, onOpenChange, group, onAdded }: {isOpen: boolean, onOpenChange: (isOpen: boolean) => void, group: IGroupDetailed, onAdded: () => void}) => {
    const [selectedItems, setSelectedItems] = useState<ISubjectModel[]>([]);
    const [teachers, setTeachers] = useState<IStudentModel[]>([]);
    const [filterValue, setFilterValue] = useState("");
    const [isFocused, setFocused] = useState<boolean>();
    const [items, setItems] = useState<PagedResponse<ISubjectModel[]>>(
        {
            pageNumber: 1,
            pageSize: 0,
            totalPages: 1,
            totalRecords: 0,
            data: [],
            succeeded: false,
            errors: null,
            message: "fd"
        }
    );

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<IStudentModel[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [selectedTeacher, setSelectedTeacher] = useState<IStudentModel>();

    const handleSearch = (query: string) => {
        const filteredResults = teachers.filter((item) =>
            item.firstname.toLowerCase().includes(query.toLowerCase()) || item.lastname.toLowerCase().includes(query.toLowerCase())
        );
        console.log("Teachers: ", teachers);
        console.log("filteredResults: ", filteredResults);
        setSearchResults(filteredResults);
        setShowResults(true);
    };

    const handleChange = (value: string) => {

        setSearchTerm(value);
        handleSearch(value);
    };

    useEffect(() => {
        getItems();

    }, [filterValue]);

    const onSearchChange = useCallback((value:string) => {
        if (value) {
            setFilterValue(value);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(()=>{
        setFilterValue("")
    },[])

    const getItems= () => {
        SubjectApi.getAllSubjects(1, 15, filterValue, "id", "ascending").then(res => {
            setItems(res.data);
            console.log(res.data);

        });
        GroupApi.getAllTeachers().then(res => {
            setTeachers(res.data);
        })
    }



    const save = () => {
        GroupApi.addSubject(selectedItems, group.id).then(() => {
            onOpenChange(false);
            onAdded();
        });

    }

    return (
        <Modal
            backdrop={"blur"}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className={"overflow-visible"}
            placement="center">
            <ModalContent>
                <ModalHeader>
                    Add student to group
                </ModalHeader>
                <ModalBody>

                    {selectedTeacher ?
                        <div className={"flex flex-col items-center bg-content2 p-2 gap-2 rounded-xl"}>
                            <Chip className={""}><div className={"flex gap-1 items-center font-medium"}><IoIosSchool size={20}/> Teacher</div></Chip>
                            <div className={"flex items-center w-full justify-between"}>
                                <div className={"flex items-center"}>
                                    {
                                        selectedTeacher.image ?
                                            <Tooltip content={
                                                <Image className={"h-[150px] rounded"}
                                                       src={import.meta.env.VITE_STORAGE_URL + selectedTeacher.image}/>
                                            }>
                                                <Image
                                                    className="h-[20px] w-[15px] object-cover rounded w-full"
                                                    src={import.meta.env.VITE_STORAGE_URL + selectedTeacher.image}/>
                                            </Tooltip>
                                            :
                                            <MdPhotoCamera className="text-default-300 h-[32px]"
                                                           size={40}/>
                                    }
                                    <span className={"text-[14px]"}>
                                {selectedTeacher.firstname} {selectedTeacher.lastname}
                                </span>
                                </div>
                                    <Button isIconOnly onPress={() => {
                                        setSelectedTeacher(undefined)
                                    }}>
                                        <FaExchangeAlt/>
                                    </Button>
                            </div>

                        </div>
                        :
                        <div>
                            <Input
                                classNames={{
                                    base: "max-w-full w-full h-10",
                                    mainWrapper: "h-full",
                                    input: "text-small",
                                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                }}
                                className="sm:hidden md:block"
                                placeholder="Choose a teacher"
                                size="md"
                                startContent={<Search size={18}/>}
                                type="search"
                                variant="bordered"
                                onClear={onClear}
                                onFocusChange={setFocused}
                                onValueChange={handleChange}
                                value={searchTerm}
                            />
                            <div className="relative h-[20px]">
                                {searchTerm != "" &&
                                    <Card shadow={"lg"} className="absolute w-full z-10">
                                        <CardBody className="p-0">
                                            {searchResults.map(teacher => {
                                                return (
                                                    <Button variant={"flat"} key={teacher.id} onPress={() => {
                                                            console.log("fadsfs");
                                                            setSelectedTeacher(teacher);

                                                        }}
                                                             className="rounded-none p-2 cursor-pointer flex items-center gap-1 justify-start">
                                                            {
                                                                teacher.image ?
                                                                    <Tooltip content={
                                                                        <Image className={"h-[150px] rounded"}
                                                                               src={import.meta.env.VITE_STORAGE_URL + teacher.image}/>
                                                                    }>
                                                                        <Image
                                                                            className="h-[20px] w-[15px] object-cover rounded w-full"
                                                                            src={import.meta.env.VITE_STORAGE_URL + teacher.image}/>
                                                                    </Tooltip>
                                                                    :
                                                                    <MdPhotoCamera className="text-default-300 h-[32px]"
                                                                                   size={40}/>
                                                            }
                                                            <span className={"text-[14px]"}>
                                                                {teacher.firstname} {teacher.lastname}
                                                            </span>
                                                        </Button>
                                                    )
                                                }
                                            )}
                                        </CardBody>
                                    </Card>
                                }
                            </div>
                        </div>

                    }

                    {selectedTeacher ?
                        <div className={"flex flex-col items-center bg-content2 p-2 gap-2 rounded-xl"}>
                            <Chip className={""}><div className={"flex gap-1 items-center font-medium"}><IoIosSchool size={20}/> Teacher</div></Chip>
                            <div className={"flex items-center w-full justify-between"}>
                                <div className={"flex items-center"}>
                                    {
                                        selectedTeacher.image ?
                                            <Tooltip content={
                                                <Image className={"h-[150px] rounded"}
                                                       src={import.meta.env.VITE_STORAGE_URL + selectedTeacher.image}/>
                                            }>
                                                <Image
                                                    className="h-[20px] w-[15px] object-cover rounded w-full"
                                                    src={import.meta.env.VITE_STORAGE_URL + selectedTeacher.image}/>
                                            </Tooltip>
                                            :
                                            <MdPhotoCamera className="text-default-300 h-[32px]"
                                                           size={40}/>
                                    }
                                    <span className={"text-[14px]"}>
                                {selectedTeacher.firstname} {selectedTeacher.lastname}
                                </span>
                                </div>
                                <Button isIconOnly onPress={() => {
                                    setSelectedTeacher(undefined)
                                }}>
                                    <FaExchangeAlt/>
                                </Button>
                            </div>

                        </div>
                        :
                        <div>
                            <Input
                                classNames={{
                                    base: "max-w-full w-full h-10",
                                    mainWrapper: "h-full",
                                    input: "text-small",
                                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                }}
                                className="sm:hidden md:block"
                                placeholder="Choose a teacher"
                                size="md"
                                startContent={<Search size={18}/>}
                                type="search"
                                variant="bordered"
                                onClear={onClear}
                                onFocusChange={setFocused}
                                onValueChange={handleChange}
                                value={searchTerm}
                            />
                            <div className="relative h-[20px]">
                                {searchTerm != "" &&
                                    <Card shadow={"lg"} className="absolute w-full z-10">
                                        <CardBody className="p-0">
                                            {searchResults.map(teacher => {
                                                    return (
                                                        <Button variant={"flat"} key={teacher.id} onPress={() => {
                                                            console.log("fadsfs");
                                                            setSelectedTeacher(teacher);

                                                        }}
                                                                className="rounded-none p-2 cursor-pointer flex items-center gap-1 justify-start">
                                                            {
                                                                teacher.image ?
                                                                    <Tooltip content={
                                                                        <Image className={"h-[150px] rounded"}
                                                                               src={import.meta.env.VITE_STORAGE_URL + teacher.image}/>
                                                                    }>
                                                                        <Image
                                                                            className="h-[20px] w-[15px] object-cover rounded w-full"
                                                                            src={import.meta.env.VITE_STORAGE_URL + teacher.image}/>
                                                                    </Tooltip>
                                                                    :
                                                                    <MdPhotoCamera className="text-default-300 h-[32px]"
                                                                                   size={40}/>
                                                            }
                                                            <span className={"text-[14px]"}>
                                                                {teacher.firstname} {teacher.lastname}
                                                            </span>
                                                        </Button>
                                                    )
                                                }
                                            )}
                                        </CardBody>
                                    </Card>
                                }
                            </div>
                        </div>

                    }

                    <Button onPress={save}>Add</Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
