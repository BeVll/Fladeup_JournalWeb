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
import {IColumn} from "../lib/types/customTableTypes.ts";
import {CustomTableHeader} from "./CustomTableHeader.tsx";

export const CustomTable = ({ tableBody, columns, pages, topContent }:{
    tableBody: ReactElement<TableBodyProps<object>, string | JSXElementConstructor<any>>,
    columns: IColumn[],
    pages: number,
    topContent: React.ReactNode
}) => {
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);
    const bottomContent = useMemo(() => {
        // @ts-ignore
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"

                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
                <span className="text-small text-default-400">

        </span>
            </div>
        );
    }, [selectedKeys, page, pages]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky={true}

            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[1500px] bg-transparent p-0 border-0 shadow-none",
            }}

            selectedKeys={selectedKeys}
            selectionMode="multiple"
            onSelectionChange={setSelectedKeys}
            topContent={topContent}
            topContentPlacement="outside"
            bottomContent={bottomContent}

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