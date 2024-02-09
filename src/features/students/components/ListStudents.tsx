import {
    Button,
    Chip, cn,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger, Image, Link,
    Spinner,
    TableBody,
    TableCell,
    TableRow, Tooltip, useDisclosure
} from "@nextui-org/react";
import {useEffect, useMemo, useState} from "react";
import {CustomTable} from "../../../components/TableComponents/CustomTable.tsx";
import {IGroupModel, IStudentModel} from "../types/students.ts";
import {IColumn} from "../../../lib/types/customTableTypes.ts";
import {ThreeDotsVertical} from "react-bootstrap-icons";
import {CustomTableHeader} from "../../../components/TableComponents/CustomTableHeader.tsx";
import {CreateGroup} from "./CreateGroup.tsx";
import {DeleteDocumentIcon} from "../../../assets/icons/DeleteDocumentIcon.tsx";
import {EditDocumentIcon} from "../../../assets/icons/EditDocumentIcon.tsx";
import {EyeFilledIcon} from "../../../assets/icons/EyeFilledIcon.tsx";
import {EditGroup} from "./EditGroup.tsx";
import {CustomPagination} from "../../../components/TableComponents/CustomPagination.tsx";
import StudentApi from "../api/StudentApi.ts";
import {DeleteModal} from "../../../components/Modals/DeleteModal.tsx";
import {PagedResponse} from "../../../lib/types/types.ts";
import {MdPhotoCamera} from "react-icons/md";
import {useNavigate} from "react-router-dom";

export const ListStudents = () => {
    const [items, setItems] = useState<PagedResponse<IStudentModel[]>>(
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
    const {isOpen, onOpenChange} = useDisclosure();
    const [isOpenDelete, setOpenDelete] = useState<boolean>(false);
    const [isOpenEdit, setOpenEdit] = useState<boolean>(false);
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [deleteItem, setDeleteItem] = useState<IGroupModel>();
    const [editGroup, setEditGroup] = useState<IGroupModel>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [filterValue, setFilterValue] = useState("");
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "id",
        direction: "ascending",
    });

    const navigate = useNavigate();

    useEffect(() => {
        getItems();
    }, [page, pageSize, filterValue, sortDescriptor]);

    const getItems = () => {
        setLoading(true);
        StudentApi.getAllStudents(page, pageSize, filterValue, sortDescriptor.column, sortDescriptor.direction).then(res => {
            setItems(res.data);
            console.log(res.data);
            setLoading(false);
        });

    }

    const checkYears = (start: number, end: number) : boolean => {
        let dt = new Date();
        if(dt.getFullYear() == start || dt.getFullYear() == end)
            return true;
        else
            return false;

    }

    const columns: IColumn[] = [
        {name: "ID", uid: "id", sortable: true},
        {name: "IMAGE/NAME", uid: "firstname", sortable: true},
        {name: "DATE OF BIRTH", uid: "dateOfBirth", sortable: false},
        {name: "STATUS", uid: "status", sortable: true},
        {name: "ACTIONS", uid: "actions", sortable: false},
    ];

    const onDeleteItem = () => {
        if(deleteItem){
            StudentApi.deleteGroup(deleteItem?.id).then(res => {
                console.log(res.data);
                setOpenDelete(false);
                getItems();
            })
        }

    }


    const bottomContent = useMemo(() => {
        if(items){
            return (
                <CustomPagination pageNumber={items.pageNumber} totalPages={items.totalPages} setPage={setPage} page={page}/>
            );
        }
            return (
                <></>
            );

    }, [items?.pageNumber, items?.totalPages]);

    // @ts-ignore
    return (
        items ?
            <>

                <CreateGroup
                    isOpen={isOpen}
                    onCreated={getItems}
                    onOpenChange={onOpenChange}
                />

                {deleteItem &&
                    <DeleteModal
                        title={"Delete group"}
                        text={"Do you want to delete group?"}
                        onDeletePress={onDeleteItem}
                        onOpenChange={setOpenDelete}
                        isOpen={isOpenDelete}
                    />
                }
                {editGroup && <EditGroup item={editGroup} onEdited={getItems} onOpenChange={setOpenEdit} isOpen={isOpenEdit}/>}

                <CustomTable
                    columns={columns}
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                    topContent={
                    <CustomTableHeader
                        onPageSizeChange={setPageSize}
                        onCreateClick={() => {onOpenChange()}}
                        totalRecords={items ? items.totalRecords : 0}
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                        searchLabel={"Search by id, names, dates..."}
                        totalLabel={"Total students:"}

                    />
                     }

                    bottomContent={bottomContent}
                    tableBody={
                        <TableBody emptyContent={!isLoading ? "No students found" : <></>} loadingContent={<Spinner/>} isLoading={isLoading} items={isLoading ? [] : items.data}>
                        {(item: IStudentModel) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.id}
                                </TableCell>
                                <TableCell>
                                    <div className="grid items-center gap-2 grid-cols-2"
                                         style={{gridTemplateColumns: "40px auto"}}>
                                        {
                                            item.image ?
                                                <Tooltip content={
                                                    <Image className={"h-[150px] rounded"}
                                                           src={import.meta.env.VITE_STORAGE_URL + item.image}/>
                                                }>
                                                    <Image className="rounded w-full"
                                                           src={import.meta.env.VITE_STORAGE_URL + item.image}/>
                                                </Tooltip>
                                                :
                                                <MdPhotoCamera className="text-default-300" size={40}/>
                                        }
                                        <Link href={"students/view/"+item.id} color={"foreground"} underline={"hover"}>
                                            {item.firstname} {item.lastname}
                                        </Link>

                                    </div>
                                </TableCell>
                                <TableCell>
                                    {item.dateOfBirth.toString()}
                                </TableCell>
                                <TableCell>
                                    <Chip variant={"flat"} color={item.status.toLowerCase() == "student" ? "primary" : "danger"}>
                                        {item.status}
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <div className="relative flex justify-end items-center gap-2">
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button
                                                    isIconOnly
                                                    size="sm" variant="light"
                                                >
                                                <ThreeDotsVertical className="text-default-300" />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                                                <DropdownItem
                                                    key="view"
                                                    shortcut="⌘N"
                                                    onPress={() => {
                                                        navigate("/students/view/"+item.id);
                                                    }}
                                                    startContent={<EyeFilledIcon className={iconClasses} />}
                                                >
                                                    View
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="edit"
                                                    shortcut="⌘⇧E"
                                                    startContent={<EditDocumentIcon className={iconClasses} />}
                                                    onPress={() => {
                                                        setEditGroup(item);
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
                }
                />
            </>
            :
            <div className="min-h-[300px] flex items-center justify-center">
                <Spinner size={"lg"}/>
            </div>

    );
}