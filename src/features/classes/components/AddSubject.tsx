import {
    Button, Card, CardBody,
    Divider,
    Input,
    Listbox,
    ListboxItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader, Select, SelectItem
} from "@nextui-org/react";
import {Search} from "react-bootstrap-icons";
import {IGroupUpdate, IStudentDetail} from "../types/students.ts";
import {Key, useCallback, useEffect, useState} from "react";
import StudentApi from "../api/StudentApi.ts";
import {PagedResponse} from "../../../lib/types/types.ts";
import {IGroupDetailed, IGroupModel} from "../../classes/types/groups.ts";
import GroupApi from "../../classes/api/GroupApi.ts";
import {IoIosRemove, IoMdAdd, IoMdAddCircle} from "react-icons/io";
import {ISubjectModel} from "../../subjects/types/subjects.ts";
import SubjectApi from "../../subjects/api/SubjectApi.ts";
import {IStudentModel} from "../../students/types/students.ts";

export const AddSubject = ({ isOpen, onOpenChange, group, onAdded }: {isOpen: boolean, onOpenChange: (isOpen: boolean) => void, group: IGroupDetailed, onAdded: () => void}) => {
    const [selectedItems, setSelectedItems] = useState<ISubjectModel[]>([]);
    const [teachers, setTeachers] = useState<IStudentModel[]>([]);
    const [filterValue, setFilterValue] = useState("");
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


    const handleSearch = (query: string) => {
        const filteredResults = teachers.filter((item) =>
            item.firstname.toLowerCase().includes(query.toLowerCase())
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

    const addItem = (item: ISubjectModel) => {
        if (!selectedItems?.find(s => s.id === item.id)) {
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, item]);
        }
    }

    const removeItem = (item: ISubjectModel) => {
        setSelectedItems(prevSelectedItems => prevSelectedItems.filter(s => s.id !== item.id));
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
            placement="auto">
            <ModalContent>
                <ModalHeader>
                    Add student to group
                </ModalHeader>
                <ModalBody>
                    <div className="bg-content2 rounded-xl">
                        <Input
                            classNames={{
                                base: "max-w-full w-full h-10",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                            className="sm:hidden md:block"
                            placeholder="Type to search group..."
                            size="md"
                            startContent={<Search size={18}/>}
                            type="search"
                            variant="bordered"
                            onClear={onClear}
                            onValueChange={handleChange}
                            value={searchTerm}
                        />
                        {showResults &&
                            <Select>
                                {searchResults.map(search => {
                                    return (
                                        <SelectItem key={search.id}>
                                            {search.lastname}
                                        </SelectItem>
                                    )
                                })}
                            </Select>
                        }

                        <Input
                            classNames={{
                                base: "max-w-full w-full h-10",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                            className="sm:hidden md:block"
                            placeholder="Type to search group..."
                            size="md"
                            startContent={<Search size={18}/>}
                            type="search"
                            variant="bordered"
                            onClear={onClear}
                            onValueChange={onSearchChange}
                            value={filterValue}
                        />
                        <Listbox variant={"flat"} className={"max-h-[300px] overflow-y-auto gap-2 "} children={items.data?.map(item => {
                            return (
                                <ListboxItem isDisabled={!!group.subjects.find(s => s.id === item.id) || !!selectedItems.find(s => s.id === item.id)} key={item.id} color={"default"}>
                                    <div className="w-full flex justify-between items-center">
                                        {item.name}
                                        <Button onPress={() => {addItem(item)}} size={"sm"} color={"primary"} variant={"flat"} isIconOnly={true}>
                                            <IoMdAdd />
                                        </Button>
                                    </div>
                                </ListboxItem>
                            )
                        })}>
                        </Listbox>
                    </div>
                    {

                        selectedItems.length > 0 && <div className="flex flex-col gap-2">
                            <span className="font-medium">Selected groups:</span>
                            {
                                selectedItems?.map(selItem => {
                                    return (
                                        <div
                                            className={"bg-content2 rounded-2xl p-2 flex justify-between items-center"}>
                                            {selItem.name}
                                            <Button onPress={() => {
                                                removeItem(selItem)
                                            }} size={"sm"} color={"danger"} variant={"flat"} isIconOnly={true}>
                                                <IoIosRemove/>
                                            </Button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }

                    <Button onPress={save}>Add</Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
