
import {formHttp, http} from "../../../http.ts";
import {IGroupCreate, IGroupModel, IGroupUpdate, ISubjectCreate, ISubjectModel} from "../types/groups.ts";
import {PagedResponse} from "../../../lib/types/types.ts";

const GroupApi = {
    getAllGroups: async function (page: number, pageSize: number, filterValue: string) {
        let url = "";
        if(filterValue != undefined && filterValue != "")
            url = "/Class?page="+page+"&pageSize="+pageSize+"&searchQuery="+filterValue;
        else
            url = "/Class?page="+page+"&pageSize="+pageSize;

        const response = await http.get<PagedResponse<IGroupModel[]>>(url);
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

export default GroupApi;