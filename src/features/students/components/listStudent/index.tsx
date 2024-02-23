import {
    Button,
    CardBody,
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
import {Key, useState} from "react";
import {CustomTable} from "../../../../components/TableComponents/CustomTable.tsx";
import {IStudentModel} from "../../types/students.ts";
import {IColumn} from "../../../../lib/types/customTableTypes.ts";
import {ThreeDotsVertical} from "react-bootstrap-icons";
import {DeleteDocumentIcon} from "../../../../assets/icons/DeleteDocumentIcon.tsx";
import {EditDocumentIcon} from "../../../../assets/icons/EditDocumentIcon.tsx";
import {EyeFilledIcon} from "../../../../assets/icons/EyeFilledIcon.tsx";
import {EditGroup} from "../EditGroup.tsx";
import StudentApi from "../../api/StudentApi.ts";
import {DeleteModal} from "../../../../components/Modals/DeleteModal.tsx";
import {PagedResponse} from "../../../../lib/types/types.ts";
import {MdPhotoCamera} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {IGroupModel} from "../../../classes/types/groups.ts";
import { CustomCard } from "../../../../components/CustomCard.tsx";

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
    const [isOpenDelete, setOpenDelete] = useState<boolean>(false);
    const [isOpenEdit, setOpenEdit] = useState<boolean>(false);
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
    const [deleteItem, setDeleteItem] = useState<IGroupModel>();
    const [editGroup, setEditGroup] = useState<IGroupModel>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isRefresh, setRefresh] = useState<boolean>(false);

    const navigate = useNavigate();

    const getItems= (page:number, pageSize:number, filterValue: string, column:Key | undefined , direction:string | undefined ) => {
        setLoading(true);

        StudentApi.getAllStudents(page, pageSize, filterValue, column, direction).then(res => {
            setItems(res.data);
            console.log(res.data);
            setLoading(false);
        });
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
            StudentApi.deleteStudent(deleteItem?.id).then(res => {
                console.log(res.data);
                setOpenDelete(false);
                setRefresh(true);
            })
        }
    }

    return (
        items ?
            <>

                {deleteItem &&
                    <DeleteModal
                        title={"Delete student"}
                        text={"Do you want to delete student?"}
                        onDeletePress={onDeleteItem}
                        onOpenChange={setOpenDelete}
                        isOpen={isOpenDelete}
                    />
                }
                {editGroup && <EditGroup item={editGroup} onEdited={getItems} onOpenChange={setOpenEdit} isOpen={isOpenEdit}/>}
                <CustomCard>
                    <CardBody className="p-4">
                <CustomTable
                    columns={columns}
                    totalLabel={"Total students: "}
                    searchLabel={"Search by firstname, lastname, date of birth"}
                    getItems={getItems}
                    items={items}
                    refresh={isRefresh}
                    onRefresh={setRefresh}
                    onOpenChange={() => {navigate("/students/create")}}
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
                                                        // @ts-ignore
                                                           src={import.meta.env.VITE_STORAGE_URL + item.image}/>
                                                }>
                                                    <Image className="rounded w-full"
                                                        // @ts-ignore
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
                    </CardBody>
                </CustomCard>
            </>

            :
            <div className="min-h-[300px] flex items-center justify-center">
                <Spinner size={"lg"}/>
            </div>

    );
}