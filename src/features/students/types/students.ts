import {ISubjectModel} from "../../subjects/types/subjects.ts";
import {IGroupModel} from "../../classes/types/groups.ts";


export interface IStudentModel{
    id: number,
    firstname: string,
    lastname: string,
    image: string,
    dateOfBirth: Date,
    status: string,
}

export interface IStudentDetail{
    id: number,
    firstname: string,
    lastname: string,
    image: string,
    status: string,
    indetificateCode: string|undefined,
    dateOfBirth: Date,
    placeOfBirth: string,
    sex: string,
    national: string,
    email: string,
    password: string,
    confirmPassword: string,
    passport: string|undefined,
    isLightTheme: boolean,
    instagram: string|undefined,
    facebook: string|undefined,
    twitter: string|undefined,
    bankAccount: string|undefined,
    groups: IGroupModel[]
}

export interface IStudentCreate{
    firstname: string,
    lastname: string,
    image: File,
    indetificateCode: string|undefined,
    dateOfBirth: Date,
    placeOfBirth: string,
    sex: string,
    national: string,
    email: string,
    password: string,
    confirmPassword: string,
    passport: string|undefined,
    isLightTheme: boolean,
    instagram: string|undefined,
    facebook: string|undefined,
    twitter: string|undefined,
    bankAccount: string|undefined
}

export interface IGroupUpdate{
    id: number,
    name: string,
    shortName: string,
    formOfStudy: string,
    yearOfStart: number,
    yearOfEnd: number
}

export interface IStudentAddresses{
    userId: number,
    country: string|undefined,
    city: string|undefined,
    street:string|undefined,
    postalCode: string|undefined,
    mailCountry: string|undefined,
    mailCity: string|undefined,
    mailStreet: string|undefined,
    mailPostalCode: string|undefined
}

export interface IStudentUpdateAddresses{
    country: string|undefined,
    city: string|undefined,
    street:string|undefined,
    postalCode: string|undefined,
    mailCountry: string|undefined,
    mailCity: string|undefined,
    mailStreet: string|undefined,
    mailPostalCode: string|undefined
}