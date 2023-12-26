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
    ModalHeader,
    TableBody,
    TableCell,
    TableRow, useDisclosure
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {CustomTable} from "../../../components/CustomTable.tsx";
import {ISubjectModel} from "../types/subjects.ts";
import SubjectApi from "../api/SubjectApi.ts";
import {IColumn} from "../../../lib/types/customTableTypes.ts";
import {ChatDots, ThreeDots, ThreeDotsVertical} from "react-bootstrap-icons";
import {CustomTableHeader} from "../../../components/CustomTableHeader.tsx";
import {CreateSubject} from "./CreateSubject.tsx";
import {get} from "axios";
import {DeleteDocumentIcon} from "../../../assets/icons/DeleteDocumentIcon.tsx";
import {EditDocumentIcon} from "../../../assets/icons/EditDocumentIcon.tsx";
import {EyeFilledIcon} from "../../../assets/icons/EyeFilledIcon.tsx";

export const ListSubjects = () => {
    const [subjects, setSubjects] = useState<ISubjectModel[]>([])
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    useEffect(() => {
        getSubjects();
    }, []);

    const getSubjects = () => {
        SubjectApi.getAllSubjects().then(res => {
            setSubjects(res.data);
            console.log(res.data);
        })
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



    return (
        subjects ?
            <>


                <CreateSubject isOpen={isOpen} onCreated={getSubjects} onOpenChange={onOpenChange}/>
                <CustomTable
                    columns={columns}
                    topContent={<CustomTableHeader onCreateClick={() => {onOpenChange()}} columns={columns}/>}

                    tableBody={
                    <TableBody emptyContent={"No users found"} items={subjects}>
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
                                                >
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="delete"
                                                    className="text-danger"
                                                    color="danger"
                                                    shortcut="⌘⇧D"
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
                } />
            </>
            :
            <></>


    );
}