
import {formHttp, http} from "../../../http.ts";
import {ISubjectCreate, ISubjectModel} from "../types/subjects.ts";
import {PagedResponse} from "../../../lib/types/types.ts";

const SubjectApi = {
    getAllSubjects: async function (page: number, pageSize: number, filterValue: string, sortBy: string, sortDirection: string) {
        let url = "";
        if(filterValue != undefined && filterValue != "")
            url = "/Subject?page="+page+"&pageSize="+pageSize+"&searchQuery="+filterValue + "&sortBy="+sortBy + "&sortDirection="+sortDirection;
        else
            url = "/Subject?page="+page+"&pageSize="+pageSize + "&sortBy="+sortBy + "&sortDirection="+sortDirection;

        const response = await http.get<PagedResponse<ISubjectModel[]>>(url);
        return response;
    },

    createSubject: async function (values: ISubjectCreate) {
        const response  = await formHttp.post<ISubjectModel>("/Subject/create", values);
        return response;
    },

    editSubject: async function (values: ISubjectModel) {
        const response  = await formHttp.put<ISubjectModel>("/Subject/update", values);
        return response;
    },

    deleteSubject: async function (id: number) {
        const response = await http.delete<ISubjectModel>("/Subject/delete/"+id);
        return response;
    },

}

export default SubjectApi;