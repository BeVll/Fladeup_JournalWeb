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
    const [subjects, setSubjects] = useState<PagedResponse<ISubjectModel[]>>()
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

    useEffect(() => {
        getSubjects();
    }, [page, pageSize, filterValue]);

    const getSubjects = () => {
        setLoading(true);
        SubjectApi.getAllSubjects(page, pageSize, filterValue).then(res => {
            setSubjects(res.data);
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

    const bottomContent = useMemo(() => {
        if(subjects){
            return (
                <CustomPagination pageNumber={subjects.pageNumber} totalPages={subjects.totalPages} setPage={setPage} page={page}/>
            );
        }
            return (
                <></>
            );

    }, [subjects?.pageNumber, subjects?.totalPages]);

    // @ts-ignore
    return (
        subjects ?
            <>

                <CreateSubject isOpen={isOpen} onCreated={getSubjects} onOpenChange={onOpenChange}/>
                {deleteSubject && <DeleteSubject subject={deleteSubject} onDeleted={getSubjects} onOpenChange={setOpenDelete} isOpen={isOpenDelete}/>}
                {editSubject && <EditSubject subject={editSubject} onEdited={getSubjects} onOpenChange={setOpenEdit} isOpen={isOpenEdit}/>}

                <CustomTable
                    columns={columns}
                    topContent={
                    <CustomTableHeader
                        onPageSizeChange={setPageSize}
                        onCreateClick={() => {onOpenChange()}}
                        totalRecords={subjects.totalRecords}
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                        searchLabel={"Search by id, name, color..."}
                        totalLabel={"Total subjects:"}
                    />
                     }

                    bottomContent={bottomContent}
                    tableBody={
                    <TableBody emptyContent={"No subjects found"} loadingContent={<Spinner/>} isLoading={isLoading} items={subjects.data}>
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
            <></>


    );
}