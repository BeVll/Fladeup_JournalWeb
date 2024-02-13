import {
    Button,
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
import {IGroupUpdate, IStudentDetail} from "../types/students.ts";
import {Key, useCallback, useEffect, useState} from "react";
import StudentApi from "../api/StudentApi.ts";
import {PagedResponse} from "../../../lib/types/types.ts";
import {IGroupModel} from "../../classes/types/groups.ts";
import GroupApi from "../../classes/api/GroupApi.ts";
import {IoMdAdd, IoMdAddCircle} from "react-icons/io";

export const AddToGroup = ({ isOpen, onOpenChange, item }: {isOpen: boolean, onOpenChange: (isOpen: boolean) => void, item: IStudentDetail}) => {
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

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center">
            <ModalContent>
                <ModalHeader>
                    Add student to group
                </ModalHeader>
                <ModalBody>
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
                           <ListboxItem key={item.id} color={"default"}>
                               <div className="w-full flex justify-between items-center">
                                   {item.name}
                                   <Button size={"sm"} color={"primary"} variant={"flat"} isIconOnly={true}>
                                       <IoMdAdd />
                                   </Button>
                               </div>
                           </ListboxItem>
                        )
                    })}>

                    </Listbox>
                    <Button>Add</Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
