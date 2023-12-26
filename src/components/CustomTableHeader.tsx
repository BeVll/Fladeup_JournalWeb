import {
    Button, Checkbox,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input, Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter, ModalHeader, useDisclosure
} from "@nextui-org/react";
import {Lock, Plus, Search} from "react-bootstrap-icons";
import {ChevronDownIcon} from "../features/subjects/assets/icons/ChevronDownIcon.tsx";
import {useCallback, useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {useNavigate} from "react-router-dom";
import {Circle, Sketch} from "@uiw/react-color";

export const CustomTableHeader = ({ columns, onCreateClick }:{ columns: any[], onCreateClick: (e: PressEvent) => void }) => {
    const [filterValue, setFilterValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();


    useEffect(() => {
        // let listColumns:string[] = [];
        // for (const column in columns) {
        //     listColumns.push(column.name);
        // }
        // setVisibleColumns(listColumns);
    }, []);

    const onSearchChange = useCallback((value:any) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(()=>{
        setFilterValue("")
        setPage(1)
    },[])

    return (
        <div className="flex flex-col gap-4">

            <div className={"flex justify-between items-center gap-3 items-end "+theme}>
                <Input
                    isClearable
                    classNames={{
                        base: "w-full sm:max-w-[44%]",
                        inputWrapper: "border-1",
                    }}
                    placeholder="Search by name..."
                    size="sm"
                    startContent={<Search className="text-default-300" />}
                    value={filterValue}
                    variant="bordered"
                    onClear={() => setFilterValue("")}
                    onValueChange={onSearchChange}
                />
                <div className="flex gap-3">
                    {/*<Dropdown>*/}
                    {/*    <DropdownTrigger className="hidden sm:flex">*/}
                    {/*        <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">*/}
                    {/*            Status*/}
                    {/*        </Button>*/}
                    {/*    </DropdownTrigger>*/}
                    {/*    <DropdownMenu*/}
                    {/*        disallowEmptySelection*/}
                    {/*        aria-label="Table Columns"*/}
                    {/*        closeOnSelect={false}*/}
                    {/*        selectedKeys={statusFilter}*/}
                    {/*        selectionMode="multiple"*/}

                    {/*    >*/}
                    {/*        {statusOptions.map((status) => (*/}
                    {/*            <DropdownItem key={status.uid} className="">*/}

                    {/*            </DropdownItem>*/}
                    {/*        ))}*/}
                    {/*    </DropdownMenu>*/}
                    {/*</Dropdown>*/}

                    <Button color="primary" onPress={onCreateClick} endContent={<Plus/>}>
                        Add New
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">Total users</span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"

                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>
        </div>
    );
};