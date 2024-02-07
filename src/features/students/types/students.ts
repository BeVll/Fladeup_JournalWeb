import {ISubjectModel} from "../../subjects/types/subjects.ts";


export interface IStudentModel{
    id: number,
    firstname: string,
    lastname: string,
    image: string,
    dateOfBirth: Date,
    status: string,
}

export interface IGroupCreate{
    name: string,
    shortName: string,
    formOfStudy: string,
    yearOfStart: number,
    yearOfEnd: number
}

export interface IGroupUpdate{
    id: number,
    name: string,
    shortName: string,
    formOfStudy: string,
    yearOfStart: number,
    yearOfEnd: number
}