
export interface IUser {
    id: string,
    name: string,
    image: string,
    email: string,
    roles: string
}

export interface ILoggedUser{
    id: number,
    name: string,
    image: string,
    email: string
}

export interface ILoginResult {
    token: string
}

export enum AuthUserActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER"
}

export interface IAuthUser {
    isAuth: boolean,
    user?: IUser,
    userToken?: string | null
}