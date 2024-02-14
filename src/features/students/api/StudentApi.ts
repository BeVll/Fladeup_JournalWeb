
import {formHttp, http} from "../../../http.ts";
import {
    IGroupCreate,
    IGroupUpdate, IStudentCreate, IStudentDetail,
    IStudentModel,
} from "../types/students.ts";
import {PagedResponse} from "../../../lib/types/types.ts";
import {Key} from "react";
import {IGroupModel} from "../../classes/types/groups.ts";

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
    getDetailedStudent: async function (id: string ) {
        const response = await http.get<IStudentDetail>("/Student/"+id);
        return response;
    },
    addToGroups: async function (groups: IGroupModel[], studentId: number) {
        const groupIds: number[] = [];

        groups.forEach(function (value) {
            groupIds.push(value.id);
        });
        const values = {
            "groupIds": groupIds,
            "studentId": studentId
        }
        const response = await formHttp.post("/Student/addToGroups", values);
        return response;
    },
    removeFromGroup: async function (groupId: number, studentId: number) {
        const response = await http.delete("/Student/removeFromGroup?studentId="+studentId+"&groupId="+groupId);
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

    deleteStudent: async function (id: number) {
        const response = await http.delete("/Student/delete/"+id);
        return response;
    },

}

export default StudentApi;