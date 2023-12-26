import {ILoginRequest} from "../types/types.ts";
import {formHttp, http} from "../../../http.ts";
import {AuthUserActionType, ILoginResult, IUser} from "../../../lib/store/types.ts";
import {jwtDecode} from "jwt-decode";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ISubjectCreate, ISubjectModel} from "../types/subjects.ts";

const SubjectApi = {
    getAllSubjects: async function () {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const response = await http.get<ISubjectModel[]>("/Subject/all");
        return response;
    },
    createSubject: async function (values: ISubjectCreate) {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        const response = await formHttp.post<ISubjectModel>("/Subject/create", values);
        return response;
    },
    // loginUser: async function (userData: ILoginUser) {
    //     try {
    //         const response = await formHttp.post("/auth/login", userData);
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // getUserProfile: async function () {
    //     try {
    //
    //         const response = await http.get<IUserEdit>("/user/userProfile");
    //         console.log(response);
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // getUserClasses: async function () {
    //     try {
    //
    //         const response = await http.get<IClassItem[]>("/user/getClasses");
    //         console.log(response);
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // getUserSchedule: async function (userId: number, date: Date) {
    //     try {
    //
    //         const response = await http.get<IEventItem[]>(`/event/forUserByDate?userId=${userId}&date=${date.toDateString()}`);
    //         console.log(response);
    //         return response;
    //     } catch (error) {
    //         throw error;
    //     }
    // },
}

export default SubjectApi;