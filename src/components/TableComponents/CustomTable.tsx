import {
    Button,
    Chip, Dropdown, DropdownItem, DropdownMenu,
    DropdownTrigger, Pagination,
    Table,
    TableBody, TableBodyProps,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User
} from "@nextui-org/react";
import {JSXElementConstructor, ReactComponentElement, ReactElement, useCallback, useMemo, useState} from "react";
import {IColumn} from "../../lib/types/customTableTypes.ts";
import {CustomTableHeader} from "./CustomTableHeader.tsx";

export const CustomTable = ({ tableBody, columns, topContent, bottomContent, sortDescriptor, onSortChange}:{
    tableBody: ReactElement<TableBodyProps<object>, string | JSXElementConstructor<any>>,
    columns: IColumn[],
    topContent: React.ReactNode,
    bottomContent: React.ReactNode,
    sortDescriptor:any,
    onSortChange:  React.Dispatch<React.SetStateAction<{column: string, direction: string}>>
}) => {
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [page, setPage] = useState(1);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky={true}
            bottomContentPlacement="outside"

            classNames={{
                wrapper: "md:max-h-[1000px] bg-transparent p-0 border-0 shadow-none ",
            }}

            selectedKeys={selectedKeys}
            selectionMode="multiple"
            onSelectionChange={setSelectedKeys}
            topContent={topContent}
            topContentPlacement="outside"
            bottomContent={bottomContent}
            sortDescriptor={sortDescriptor}
            onSortChange={onSortChange}
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        className={column.uid == "actions" ? "text-end" : "text-start"}
                        align={column.uid == "actions" ? "end" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            {tableBody}
        </Table>
    );
};