import {ISubjectModel} from "../../subjects/types/subjects.ts";


export interface IStudentModel{
    id: number,
    firstname: string,
    lastname: string,
    image: string,
    dateOfBirth: Date,
    status: string,
}

export interface IStudentCreate{
    firstname: string,
    lastname: string,
    image: string|undefined,
    indetificateCode: string|undefined,
    dateOfBirth: Date,
    placeOfBirth: string,
    sex: string,
    national: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface IGroupUpdate{
    id: number,
    name: string,
    shortName: string,
    formOfStudy: string,
    yearOfStart: number,
    yearOfEnd: number
}