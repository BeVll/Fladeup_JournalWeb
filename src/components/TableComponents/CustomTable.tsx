import {
    SortDescriptor,
    Table,
    TableBodyProps,
    TableColumn,
    TableHeader,
} from "@nextui-org/react";
import {
    JSXElementConstructor, Key,
    ReactElement,
    useEffect, useMemo,
    useState
} from "react";
import {IColumn} from "../../lib/types/customTableTypes.ts";
import {CustomTableHeader} from "./CustomTableHeader.tsx";
import {CustomPagination} from "./CustomPagination.tsx";
import {PagedResponse} from "../../lib/types/types.ts";

export const CustomTable = ({ tableBody, columns, searchLabel, totalLabel, getItems, onOpenChange, items, onRefresh, refresh}:{
    tableBody: ReactElement<TableBodyProps<object>, string | JSXElementConstructor<any>>,
    columns: IColumn[],
    searchLabel: string,
    totalLabel: string,
    getItems: (page:number, pageSize:number, filterValue: string, column:Key | undefined , direction:string | undefined ) => void,
    onOpenChange: () => void,
    items: PagedResponse<unknown>,
    onRefresh:  React.Dispatch<React.SetStateAction<boolean>>,
    refresh: boolean
}) => {
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [filterValue, setFilterValue] = useState("");

    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "id",
        direction: "ascending",
    });



    useEffect(() => {
        if(refresh){
            getItems(page, pageSize, filterValue, sortDescriptor.column, sortDescriptor.direction);
            onRefresh(false);
        }

    }, [refresh]);

    useEffect(() => {
        console.log("fdsfds");
        getItems(page, pageSize, filterValue, sortDescriptor.column, sortDescriptor.direction);
    }, []);

    useEffect(() => {
        console.log("useEffect triggered");
        console.log("page:", page);
        console.log("pageSize:", pageSize);
        console.log("filterValue:", filterValue);
        console.log("sortDescriptor:", sortDescriptor);

        getItems(page, pageSize, filterValue, sortDescriptor.column, sortDescriptor.direction);
    }, [page, pageSize, filterValue, sortDescriptor.column, sortDescriptor.direction]);




    const bottomContent = useMemo(() => {
        console.log(items);
        if(items){
            return (
                <CustomPagination pageNumber={items.pageNumber} totalPages={items.totalPages} setPage={setPage} page={page}/>
            );
        }
        return (
            <></>
        );

    }, [items?.pageNumber, items?.totalPages]);


    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky={true}
            bottomContentPlacement="outside"

            classNames={{
                wrapper: "md:max-h-[1000px] bg-transparent p-0 border-0 shadow-none ",
                table: "p-0",
                tbody: "p-0"
            }}

            selectedKeys={selectedKeys}
            selectionMode="multiple"
            onSelectionChange={setSelectedKeys}
            topContent={<CustomTableHeader
                onPageSizeChange={setPageSize}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                searchLabel={searchLabel}
                totalLabel={totalLabel}
                onCreateClick={() => {onOpenChange()}}
                totalRecords={items ? items.totalRecords : 0}/>}
            topContentPlacement="outside"
            bottomContent={bottomContent}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
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

export default CustomTable;