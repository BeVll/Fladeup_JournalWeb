
import {formHttp, http} from "../../../http.ts";
import {
    IGroupCreate,
    IGroupUpdate, IStudentCreate,
    IStudentModel,
} from "../types/students.ts";
import {PagedResponse} from "../../../lib/types/types.ts";
import {Key} from "react";

const StudentApi = {
    getAllStudents: async function (page: number, pageSize: number, filterValue: string, sortBy: Key | undefined, sortDirection: string | undefined ) {
        let url = "";
        if(filterValue != undefined && filterValue != "")
            url = "/Student?page="+page+"&pageSize="+pageSize+"&searchQuery="+filterValue + "&sortBy="+sortBy + "&sortDirection="+sortDirection;
        else
            url = "/Student?page="+page+"&pageSize="+pageSize + "&sortBy="+sortBy + "&sortDirection="+sortDirection;

        const response = await http.get<PagedResponse<IStudentModel[]>>(url);
        return response;
    },
    createStudent: async function (values: IStudentCreate) {
        const response  = await formHttp.post("/Student/create", values);
        return response;
    },

    editGroup: async function (values: IGroupUpdate) {
        const response  = await formHttp.put("Class", values);
        return response;
    },

    deleteGroup: async function (id: number) {
        const response = await http.delete("/Class/delete/"+id);
        return response;
    },

}

export default StudentApi;