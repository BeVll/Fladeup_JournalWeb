import {
    Button,
    Input,
} from "@nextui-org/react";
import {Plus, Search} from "react-bootstrap-icons";
import {useCallback, useEffect, useState} from "react";
import {useTheme} from "next-themes";
import {useNavigate} from "react-router-dom";

export const CustomTableHeader = (
        {
            onCreateClick,
            onPageSizeChange,
            totalRecords,
            filterValue,
            setFilterValue,
            searchLabel,
            totalLabel
        }
        :
        {
            onCreateClick: (e: PressEvent) => void,
            onPageSizeChange: (pageSize: number) => void,
            totalRecords: number,
            filterValue: string,
            setFilterValue:  React.Dispatch<React.SetStateAction<string>>,
            searchLabel: string,
            totalLabel: string
        })=> {

    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();


    useEffect(() => {
        // let listColumns:string[] = [];
        // for (const column in columns) {
        //     listColumns.push(column.name);
        // }
        // setVisibleColumns(listColumns);
    }, []);

    const onSearchChange = useCallback((value:any) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(()=>{
        setFilterValue("")
        setPage(1)
    },[])

    return (
        <div className="flex flex-col gap-4">

            <div className={"flex justify-between items-center gap-3 items-end "+theme}>
                <Input
                    isClearable
                    classNames={{
                        base: "w-full sm:max-w-[44%]",
                        inputWrapper: "border-1",
                    }}
                    placeholder={searchLabel}
                    size="sm"
                    startContent={<Search className="text-default-300" />}
                    value={filterValue}
                    variant="bordered"
                    onClear={onClear}
                    onValueChange={onSearchChange}
                />
                <div className="flex gap-3">
                    <Button color="primary" onPress={onCreateClick} endContent={<Plus/>}>
                        Add New
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">{totalLabel} {totalRecords}</span>
                <label className="flex items-center text-default-400 text-small">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        onChange={(e) => {onPageSizeChange(Number(e.target.value))}}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
            </div>
        </div>
    );
};