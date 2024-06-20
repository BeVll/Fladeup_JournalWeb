
import {formHttp, http} from "../../../http.ts";
import {
    IGenderModel,
    IGroupCreate,
    IGroupUpdate, IStudentAddresses, IStudentCreate, IStudentDetail,
    IStudentModel, IStudentUpdate, IStudentUpdateAddresses, IStudentUpdateModel,
} from "../types/students.ts";
import {PagedResponse} from "../../../lib/types/types.ts";
import {Key} from "react";
import {IGroupModel} from "../../classes/types/groups.ts";

const TeacherApi = {
    getAllTeachers: async function (page: number, pageSize: number, filterValue: string, sortBy: Key | undefined, sortDirection: string | undefined ) {
        let url = "";
        if(filterValue != undefined && filterValue != "")
            url = "/teacher?page="+page+"&pageSize="+pageSize+"&searchQuery="+filterValue + "&sortBy="+sortBy + "&sortDirection="+sortDirection;
        else
            url = "/teacher?page="+page+"&pageSize="+pageSize + "&sortBy="+sortBy + "&sortDirection="+sortDirection;

        const response = await http.get<PagedResponse<IStudentModel[]>>(url);
        return response;
    },
    getDetailedTeacher: async function (id: string ) {
        const response = await http.get<IStudentDetail>("/teacher/"+id);
        return response;
    },
    getDetailedTeacherUpdate: async function (id: string ) {
        const response = await http.get<IStudentUpdateModel>("/teacher/editTeacher/"+id);
        return response;
    },
    getAddresses: async function (id: string ) {
        const response = await http.get<IStudentAddresses>("/teacher/addresses/"+id);
        return response;
    },
    updateAddresses: async function (values: IStudentUpdateAddresses, id: string ) {
        const response = await formHttp.put<IStudentAddresses>("/teacher/updateAddresses/"+id, values);
        return response;
    },
    updateTeacher: async function (values: IStudentUpdate, id: string ) {
        const response = await formHttp.put<IStudentAddresses>("/teacher/update/"+id, values);
        return response;
    },
    createTeacher: async function (values: IStudentCreate) {
        const response  = await formHttp.post("/teacher/create", values);
        return response;
    },

    deleteTeacher: async function (id: number) {
        const response = await http.delete("/teacher/delete/"+id);
        return response;
    },

}

export default TeacherApi;