import {
    Button,
    Checkbox,
    Chip, cn,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalContent, ModalFooter,
    ModalHeader, Pagination, Spinner,
    TableBody,
    TableCell,
    TableRow, useDisclosure
} from "@nextui-org/react";
import {useEffect, useMemo, useState} from "react";
import {CustomTable} from "../../../components/CustomTable.tsx";
import {ISubjectModel, PagedResponse} from "../types/subjects.ts";
import SubjectApi from "../api/SubjectApi.ts";
import {IColumn} from "../../../lib/types/customTableTypes.ts";
import {ChatDots, ThreeDots, ThreeDotsVertical} from "react-bootstrap-icons";
import {CustomTableHeader} from "../../../components/CustomTableHeader.tsx";
import {CreateSubject} from "./CreateSubject.tsx";
import {get} from "axios";
import {DeleteDocumentIcon} from "../../../assets/icons/DeleteDocumentIcon.tsx";
import {EditDocumentIcon} from "../../../assets/icons/EditDocumentIcon.tsx";
import {EyeFilledIcon} from "../../../assets/icons/EyeFilledIcon.tsx";
import {DeleteSubject} from "./DeleteSubject.tsx";
import {EditSubject} from "./EditSubject.tsx";

export const ListSubjects = () => {
    const [subjects, setSubjects] = useState<PagedResponse<ISubjectModel[]>>()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isOpenDelete, setOpenDelete] = useState<boolean>(false);
    const [isOpenEdit, setOpenEdit] = useState<boolean>(false);
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [deleteSubject, setDeleteSubject] = useState<ISubjectModel>();
    const [editSubject, setEditSubject] = useState<ISubjectModel>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        getSubjects();
    }, [page, pageSize]);

    const getSubjects = () => {
        setLoading(true);
        SubjectApi.getAllSubjects(page, pageSize).then(res => {
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

    // const tableBody = () => {
    //     return (
    //
    //     );
    // }

    const bottomContent = useMemo(() => {
        // @ts-ignore

        if(subjects){
            return (
                <div className="py-2 px-2 flex justify-between items-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={subjects?.pageNumber}
                        total={subjects?.totalPages}
                        onChange={setPage}
                    />
                    <div className="hidden sm:flex w-[30%] justify-end gap-2">
                        <Button isDisabled={subjects?.totalPages === 1} size="sm" variant="flat" onPress={() => {setPage(page-1); getSubjects();}}>
                            Previous
                        </Button>
                        <Button isDisabled={subjects?.totalPages === 1} size="sm" variant="flat" onPress={() => {setPage(page+1); getSubjects();}}>
                            Next
                        </Button>
                    </div>
                </div>
            );
        }
        else
            return (
                <></>
            );

    }, [subjects?.pageNumber, subjects?.totalPages]);

    return (
        subjects ?
            <>


                <CreateSubject isOpen={isOpen} onCreated={getSubjects} onOpenChange={onOpenChange}/>
                {deleteSubject && <DeleteSubject subject={deleteSubject} onDeleted={getSubjects} onOpenChange={setOpenDelete} isOpen={isOpenDelete}/>}
                {editSubject && <EditSubject subject={editSubject} onEdited={getSubjects} onOpenChange={setOpenEdit} isOpen={isOpenEdit}/>}
                <CustomTable
                    columns={columns}
                    topContent={<CustomTableHeader onPageSizeChange={setPageSize} onCreateClick={() => {onOpenChange()}} columns={columns}/>}

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