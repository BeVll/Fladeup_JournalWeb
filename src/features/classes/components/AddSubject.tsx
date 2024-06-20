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
import StudentApi from "../api/TeacherApi.ts";
import {PagedResponse} from "../../../lib/types/types.ts";
import {IGroupAddSubject, IGroupCreate, IGroupDetailed, IGroupModel} from "../../classes/types/groups.ts";
import GroupApi from "../../classes/api/GroupApi.ts";
import {IoIosRemove, IoIosSchool, IoMdAdd, IoMdAddCircle} from "react-icons/io";
import {ISubjectModel} from "../../subjects/types/subjects.ts";
import SubjectApi from "../../subjects/api/SubjectApi.ts";
import {IStudentModel} from "../../students/types/students.ts";
import {MdOutlineMenuBook, MdPhotoCamera} from "react-icons/md";
import {FaBook, FaExchangeAlt} from "react-icons/fa";
import {FiBook} from "react-icons/fi";
import * as Yup from "yup";
import {useFormik} from "formik";

export const AddSubject = ({ isOpen, onOpenChange, group, onAdded }: {isOpen: boolean, onOpenChange: (isOpen: boolean) => void, group: IGroupDetailed, onAdded: () => void}) => {
    const [teachers, setTeachers] = useState<IStudentModel[]>([]);
    const [filterValue, setFilterValue] = useState("");
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<IStudentModel[]>([]);
    const [selectedTeacher, setSelectedTeacher] = useState<IStudentModel>();

    const [subjects, setSubjects] = useState<ISubjectModel[]>([]);
    const [filterSubjects, setFilterSubjects] = useState("");
    const [searchSubject, setSearchSubject] = useState<string>('');
    const [searchSubjectsResults, setSearchSubjectsResults] = useState<ISubjectModel[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<ISubjectModel>();

    const handleSearch = (query: string) => {
        const filteredResults = teachers.filter((item) =>
            item.firstname.toLowerCase().includes(query.toLowerCase()) || item.lastname.toLowerCase().includes(query.toLowerCase())
        );
        console.log("Teachers: ", subjects);
        console.log("filteredResults: ", filteredResults);
        setSearchResults(filteredResults);
    };

    const handleSearchSubject = (query: string) => {
        console.log("Subjects: ", subjects);
        const filteredResults = subjects.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) || item.color.toLowerCase().includes(query.toLowerCase())
        );
        console.log("Subjects: ", subjects);
        console.log("filteredResults: ", filteredResults);
        setSearchSubjectsResults(filteredResults);
    };

    const handleChange = (value: string) => {

        setSearchTerm(value);
        handleSearch(value);
    };

    const handleChangeSubject = (value: string) => {

        setSearchSubject(value);
        handleSearchSubject(value);
    };

    useEffect(() => {
        getItems();

    }, [filterValue, filterSubjects]);




    const getItems= () => {
        SubjectApi.getAllSubjects().then(res => {
            console.log(res.data);
            setSubjects(res.data);
        });
        GroupApi.getAllTeachers().then(res => {
            setTeachers(res.data);
        })
    }

    const SignupSchema = Yup.object().shape({
        classId: Yup.string()
            .required('Required'),
        subjectId: Yup.string()
            .required('Required'),
        teacherId: Yup.string()
            .required('Required'),
    });

    const initialValues: IGroupAddSubject = {
        classId: group.id,
        subjectId: undefined,
        teacherId: undefined,
        description: ""
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: values => {
            GroupApi.addSubject(values).then(res => {
                formik.resetForm();
                onOpenChange(false);
            })
        },
    });


    return (
        <Modal
            backdrop={"blur"}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className={"overflow-visible"}
            placement="center">
            <ModalContent>
                <ModalHeader>
                    Add subject for group
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={formik.handleSubmit} className={"gap-4 flex flex-col"}>
                        {selectedTeacher ?
                            <div className={"flex flex-col bg-content2 p-2 gap-2 rounded-xl"}>
                                <Chip variant={"shadow"}><div className={"flex gap-1 items-center font-medium"}><IoIosSchool size={20}/> Teacher</div></Chip>
                                <div className={"flex items-center  w-full justify-between"}>
                                    <div className={"flex items-center gap-[10px]"}>
                                        {
                                            selectedTeacher.image ?
                                                <Tooltip content={
                                                    <Image className={"h-[150px] rounded"}
                                                           src={import.meta.env.VITE_STORAGE_URL + selectedTeacher.image}/>
                                                }>
                                                    <Image
                                                        className="h-[40px] w-[30px] object-cover rounded"
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
                                        setSelectedTeacher(undefined);
                                        formik.setFieldValue("teacherId", undefined)
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
                                                                formik.setFieldValue("teacherId", teacher.id)
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

                        {selectedSubject ?
                            <div className={"flex flex-col bg-content2 p-2 gap-2 rounded-xl"}>
                                <Chip variant={"shadow"}><div className={"flex gap-1 items-center font-medium"}>
                                    <MdOutlineMenuBook size={20}/>Subject
                                </div>
                                </Chip>
                                <div className={"flex items-center w-full justify-between"}>
                                    <div className={"flex items-center gap-2"}>
                                        <div className={"w-[3px] h-[32px] rounded-xl"} style={{backgroundColor: selectedSubject.color}}></div>
                                        <span className={"text-[14px]"}>
                                    {selectedSubject.name}
                                    </span>
                                    </div>
                                    <Button isIconOnly onPress={() => {
                                        setSelectedSubject(undefined);
                                        formik.setFieldValue("subjectId", undefined)
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
                                    placeholder="Choose a subject"
                                    size="md"
                                    startContent={<Search size={18}/>}
                                    type="search"
                                    variant="bordered"

                                    onValueChange={handleChangeSubject}
                                    value={searchSubject}
                                />
                                <div className="relative h-[20px]">
                                    {searchSubject != "" &&
                                        <Card shadow={"lg"} className="absolute w-full z-40">
                                            <CardBody className="p-0">
                                                {searchSubjectsResults.map(subject => {
                                                        return (
                                                            <Button variant={"flat"} key={subject.id} onPress={() => {
                                                                console.log("fadsfs");
                                                                setSelectedSubject(subject);
                                                                formik.setFieldValue("subjectId", subject.id)
                                                            }}
                                                                    className="rounded-none p-2 cursor-pointer flex items-center gap-1 justify-start">

                                                            <span className={"text-[14px]"}>
                                                                {subject.name}
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
                        <Input labelPlacement={"inside"} name={"description"} value={formik.values.description} onChange={formik.handleChange} label={"Description"}/>
                        <Button type={"submit"}>Add</Button>
                    </form>

                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
