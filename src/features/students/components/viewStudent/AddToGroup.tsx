import {
    Button, Card, CardBody,
    Divider,
    Input,
    Listbox,
    ListboxItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader
} from "@nextui-org/react";
import {Search} from "react-bootstrap-icons";
import {IGroupUpdate, IStudentDetail} from "../../types/students.ts";
import {Key, useCallback, useEffect, useState} from "react";
import StudentApi from "../../api/StudentApi.ts";
import {PagedResponse} from "../../../../lib/types/types.ts";
import {IGroupModel} from "../../../classes/types/groups.ts";
import GroupApi from "../../../classes/api/GroupApi.ts";
import {IoIosRemove, IoMdAdd, IoMdAddCircle} from "react-icons/io";

export const AddToGroup = ({ isOpen, onOpenChange, student, onAdded }: {isOpen: boolean, onOpenChange: (isOpen: boolean) => void, student: IStudentDetail, onAdded: () => void}) => {
    const [selectedItems, setSelectedItems] = useState<IGroupModel[]>([]);
    const [filterValue, setFilterValue] = useState("");
    const [items, setItems] = useState<PagedResponse<IGroupModel[]>>(
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
        GroupApi.getAllGroups(1, 15, filterValue, "id", "ascending").then(res => {
            setItems(res.data);
            console.log(res.data);

        });
    }

    const addItem = (item: IGroupModel) => {
        if (!selectedItems?.find(s => s.id === item.id)) {
            setSelectedItems(prevSelectedItems => [...prevSelectedItems, item]);
        }
    }

    const removeItem = (item: IGroupModel) => {
        setSelectedItems(prevSelectedItems => prevSelectedItems.filter(s => s.id !== item.id));
    }

    const save = () => {
        StudentApi.addToGroups(selectedItems, student.id).then(() => {
            onOpenChange(false);
            onAdded();
            setSelectedItems([]);
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
                            onValueChange={onSearchChange}
                            value={filterValue}
                        />
                        <Listbox variant={"flat"} className={"max-h-[300px] overflow-y-auto gap-2 "} children={items.data?.map(item => {
                            return (
                                <ListboxItem isDisabled={!!student.groups.find(s => s.id === item.id) || !!selectedItems.find(s => s.id === item.id)} key={item.id} color={"default"}>
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
