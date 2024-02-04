import {Button, Pagination} from "@nextui-org/react";

export const CustomPagination = (
    {
        pageNumber,
        totalPages,
        setPage,
        page
    }
        :
        {
            pageNumber: number,
            totalPages: number,
            setPage: React.Dispatch<React.SetStateAction<number>>,
            page: number,

        }) => {
    return (
        <div className="py-2 px-2 flex justify-between items-center">
            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={pageNumber}
                total={totalPages}
                onChange={setPage}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
                <Button isDisabled={totalPages === 1 || pageNumber == 1} size="sm" variant="flat"
                        onPress={() => {
                            setPage(page - 1);

                        }}>
                    Previous
                </Button>
                <Button isDisabled={totalPages === 1 || pageNumber == totalPages} size="sm"
                        variant="flat" onPress={() => {
                    setPage(page + 1);

                }}>
                    Next
                </Button>
            </div>
        </div>
    );
};
