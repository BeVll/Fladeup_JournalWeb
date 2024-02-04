export interface PagedResponse<T>{
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalRecords: number,
    data?: T,
    succeeded: boolean,
    errors?: string[] | null,
    message: string;
}