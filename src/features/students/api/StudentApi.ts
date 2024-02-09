
import {formHttp, http} from "../../../http.ts";
import {
    IGroupCreate,
    IGroupModel,
    IGroupUpdate,
    IStudentModel,
    ISubjectCreate,
    ISubjectModel
} from "../types/students.ts";
import {PagedResponse} from "../../../lib/types/types.ts";

const StudentApi = {
    getAllStudents: async function (page: number, pageSize: number, filterValue: string, sortBy: string, sortDirection: string) {
        let url = "";
        if(filterValue != undefined && filterValue != "")
            url = "/Student?page="+page+"&pageSize="+pageSize+"&searchQuery="+filterValue + "&sortBy="+sortBy + "&sortDirection="+sortDirection;
        else
            url = "/Student?page="+page+"&pageSize="+pageSize + "&sortBy="+sortBy + "&sortDirection="+sortDirection;

        const response = await http.get<PagedResponse<IStudentModel[]>>(url);
        return response;
    },
    createGroup: async function (values: IGroupCreate) {
        const response  = await formHttp.post<ISubjectModel>("/Class/create", values);
        return response;
    },

    editGroup: async function (values: IGroupUpdate) {
        const response  = await formHttp.put<IGroupModel>("Class", values);
        return response;
    },

    deleteGroup: async function (id: number) {
        const response = await http.delete("/Class/delete/"+id);
        return response;
    },

}

export default StudentApi;