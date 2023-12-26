import {AuthUserActionType, IAuthUser, IUser} from "./types.ts";

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initState: IAuthUser = {
    isAuth: false,
    user: undefined,
    userToken}

export const AuthReducer = (state=initState, action: any) : IAuthUser => {

    switch(action.type) {
        case AuthUserActionType.LOGIN_USER: {
            const user = action.payload as IUser;
            return {
                isAuth: true,
                user
            };
        }
        case AuthUserActionType.LOGOUT_USER: {
            return {
                isAuth: false
            };
        }
    }
    return state;
}