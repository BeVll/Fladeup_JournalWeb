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
import {useEffect, useMemo, useState} from "react";
import {CustomTable} from "../../../components/TableComponents/CustomTable.tsx";
import {ISubjectModel} from "../types/subjects.ts";
import SubjectApi from "../api/SubjectApi.ts";
import {IColumn} from "../../../lib/types/customTableTypes.ts";
import {ThreeDotsVertical} from "react-bootstrap-icons";
import {CustomTableHeader} from "../../../components/TableComponents/CustomTableHeader.tsx";
import {CreateSubject} from "./CreateSubject.tsx";
import {DeleteDocumentIcon} from "../../../assets/icons/DeleteDocumentIcon.tsx";
import {EditDocumentIcon} from "../../../assets/icons/EditDocumentIcon.tsx";
import {EyeFilledIcon} from "../../../assets/icons/EyeFilledIcon.tsx";
import {DeleteSubject} from "./DeleteSubject.tsx";
import {EditSubject} from "./EditSubject.tsx";
import {CustomPagination} from "../../../components/TableComponents/CustomPagination.tsx";
import {PagedResponse} from "../../../lib/types/types.ts";

export const ListSubjects = () => {
    const [items, setItems] = useState<PagedResponse<ISubjectModel[]>>()
    const {isOpen, onOpenChange} = useDisclosure();
    const [isOpenDelete, setOpenDelete] = useState<boolean>(false);
    const [isOpenEdit, setOpenEdit] = useState<boolean>(false);
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [deleteSubject, setDeleteSubject] = useState<ISubjectModel>();
    const [editSubject, setEditSubject] = useState<ISubjectModel>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [filterValue, setFilterValue] = useState("");

    const [sortDescriptor, setSortDescriptor] = useState({
        column: "id",
        direction: "ascending",
    });

    useEffect(() => {
        getSubjects();
    }, [page, pageSize, filterValue, sortDescriptor]);

    const getSubjects = () => {
        setLoading(true);

        SubjectApi.getAllSubjects(page, pageSize, filterValue, sortDescriptor.column, sortDescriptor.direction).then(async res => {
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

    const sortedItems = useMemo(() => {
        console.log(sortDescriptor);
        if(items){
            return [...items.data].sort((a, b) => {
                const first = a[sortDescriptor.column];
                const second = b[sortDescriptor.column];
                const cmp = first < second ? -1 : first > second ? 1 : 0;

                return sortDescriptor.direction === "descending" ? -cmp : cmp;
            });
        }
        return items;
    }, [sortDescriptor, items]);

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

                <CreateSubject isOpen={isOpen} onCreated={getSubjects} onOpenChange={onOpenChange}/>
                {deleteSubject && <DeleteSubject subject={deleteSubject} onDeleted={getSubjects} onOpenChange={setOpenDelete} isOpen={isOpenDelete}/>}
                {editSubject && <EditSubject subject={editSubject} onEdited={getSubjects} onOpenChange={setOpenEdit} isOpen={isOpenEdit}/>}

                <CustomTable
                    columns={columns}
                    sortDescriptor={sortDescriptor}
                    onSortChange={setSortDescriptor}
                    topContent={
                    <CustomTableHeader
                        onPageSizeChange={setPageSize}
                        onCreateClick={() => {onOpenChange()}}
                        totalRecords={items.totalRecords}
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                        searchLabel={"Search by id, name, color..."}
                        totalLabel={"Total subjects:"}
                    />
                     }

                    bottomContent={bottomContent}
                    tableBody={
                    <TableBody emptyContent={!isLoading ? "No subjects found" : <></>} loadingContent={<Spinner/>} isLoading={isLoading} items={isLoading ? [] : sortedItems}>
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
                                                    startContent={<EyeFilledIcon className={iconClasses} />}
                                                >
                                                    View
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="edit"
                                                    shortcut="⌘⇧E"
                                                    startContent={<EditDocumentIcon className={iconClasses} />}
                                                    onPress={() => {
                                                        setEditSubject(item);
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
                                                        setDeleteSubject(item);
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