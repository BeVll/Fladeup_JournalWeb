
import {formHttp, http} from "../../../http.ts";
import {IGroupAddSubject, IGroupCreate, IGroupDetailed, IGroupModel, IGroupUpdate} from "../types/groups.ts";
import {PagedResponse} from "../../../lib/types/types.ts";
import {Key} from "react";
import {IStudentDetail, IStudentModel} from "../../students/types/students.ts";
import {ISubjectModel} from "../../subjects/types/subjects.ts";

const GroupApi = {
    getAllGroups: async function (page: number, pageSize: number, filterValue: string, sortBy: Key | undefined, sortDirection: string | undefined ) {
        let url = "";
        if(filterValue != undefined && filterValue != "")
            url = "/Class?page="+page+"&pageSize="+pageSize+"&searchQuery="+filterValue + "&sortBy="+sortBy + "&sortDirection="+sortDirection;
        else
            url = "/Class?page="+page+"&pageSize="+pageSize + "&sortBy="+sortBy + "&sortDirection="+sortDirection;

        const response = await http.get<PagedResponse<IGroupModel[]>>(url);
        return response;
    },
    getDetailedGroup: async function (id:string) {
        const response = await http.get<IGroupDetailed>("/Class/"+id);
        return response;
    },
    addSubject: async function (values: IGroupAddSubject) {
        const response = await formHttp.post("/Class/addSubject", values);
        return response;
    },
    getAllTeachers: async function () {
        const response = await http.get<IStudentModel[]>("/Teacher/all");
        return response;
    },
    createGroup: async function (values: IGroupCreate) {
        const response  = await formHttp.post("/Class/create", values);
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

export default GroupApi;