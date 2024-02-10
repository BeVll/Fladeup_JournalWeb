import {
    Button,
    Chip, cn,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Spinner,
    TableBody,
    TableCell,
    TableRow, useDisclosure
} from "@nextui-org/react";
import {Key, useState} from "react";
import {CustomTable} from "../../../components/TableComponents/CustomTable.tsx";
import {ISubjectModel} from "../types/subjects.ts";
import SubjectApi from "../api/SubjectApi.ts";
import {IColumn} from "../../../lib/types/customTableTypes.ts";
import {ThreeDotsVertical} from "react-bootstrap-icons";
import {CreateSubject} from "./CreateSubject.tsx";
import {DeleteDocumentIcon} from "../../../assets/icons/DeleteDocumentIcon.tsx";
import {EditDocumentIcon} from "../../../assets/icons/EditDocumentIcon.tsx";
import {EyeFilledIcon} from "../../../assets/icons/EyeFilledIcon.tsx";
import {DeleteSubject} from "./DeleteSubject.tsx";
import {EditSubject} from "./EditSubject.tsx";
import {PagedResponse} from "../../../lib/types/types.ts";

export const ListSubjects = () => {
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
    )
    const [isOpenDelete, setOpenDelete] = useState<boolean>(false);
    const [isOpenEdit, setOpenEdit] = useState<boolean>(false);
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [deleteItem, setDeleteItem] = useState<ISubjectModel>();
    const [editItem, setEditItem] = useState<ISubjectModel>();
    const {isOpen, onOpenChange} = useDisclosure();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isRefresh, setRefresh] = useState<boolean>(false);
    const getItems= (page:number, pageSize:number, filterValue: string, column:Key | undefined , direction:string | undefined ) => {
        setLoading(true);

        SubjectApi.getAllSubjects(page, pageSize, filterValue, column, direction).then(async res => {
            setItems(res.data);
            console.log(res.data);
            setLoading(false);
        });
    }

    const columns: IColumn[] = [
        {name: "ID", uid: "id", sortable: true},
        {name: "NAME", uid: "name", sortable: true},
        {name: "COLOR", uid: "color", sortable: false},
        {name: "ACTIONS", uid: "actions", sortable: false},
    ];

    return (

            <>
                <CreateSubject isOpen={isOpen} onCreated={() => {setRefresh(true)}} onOpenChange={onOpenChange}/>
                {deleteItem && <DeleteSubject item={deleteItem} onDeleted={() => {setRefresh(true)}} onOpenChange={setOpenDelete} isOpen={isOpenDelete}/>}
                {editItem && <EditSubject item={editItem} onEdited={() => {setRefresh(true)}} onOpenChange={setOpenEdit} isOpen={isOpenEdit}/>}

                <CustomTable
                    columns={columns}
                    totalLabel={"Total subjects: "}
                    searchLabel={"Search by name, color"}
                    getItems={getItems}
                    items={items}
                    refresh={isRefresh}
                    onRefresh={setRefresh}
                    onOpenChange={onOpenChange}
                    tableBody={
                    items ? <TableBody emptyContent={!isLoading ? "No subjects found" : <></>} loadingContent={<Spinner/>} isLoading={isLoading} items={isLoading ? [] : items.data}>
                        {(item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.id}
                                </TableCell>
                                <TableCell>
                                    {item.name}
                                </TableCell>
                                <TableCell>
                                    <Chip className="text-content1 font-black" style={{background: item.color}} size="sm" variant="flat">
                                        {item.color}
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <div className="relative flex justify-end items-center gap-2 text-white font-bold w-[500px]">
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button
                                                    isIconOnly
                                                    size="sm"  variant="light"
                                                >
                                                    <ThreeDotsVertical className="text-default-300" />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                                                <DropdownItem
                                                    key="view"
                                                    shortcut="⌘N"
                                                    startContent={<EyeFilledIcon className={iconClasses} />}
                                                >
                                                    View
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="edit"
                                                    shortcut="⌘⇧E"
                                                    startContent={<EditDocumentIcon className={iconClasses} />}
                                                    onPress={() => {
                                                        setEditItem(item);
                                                        setOpenEdit(true);
                                                    }}
                                                >
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="delete"
                                                    className="text-danger"
                                                    color="danger"
                                                    shortcut="⌘⇧D"
                                                    onPress={() => {
                                                        setDeleteItem(item);
                                                        setOpenDelete(true);
                                                    }}
                                                    startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
                                                >
                                                    Delete
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                        :
                        <></>
                }
                />
            </>


    );
}