import {ISubjectModel} from "../../subjects/types/subjects.ts";
import {IStudentModel} from "../../students/types/students.ts";


export interface IGroupModel{
    id: number,
    name: string,
    shortName: string,
    formOfStudy: string,
    yearOfStart: number,
    yearOfEnd: number,
    subjects: ISubjectModel
}

export interface IGroupDetailed{
    id: number,
    name: string,
    shortName: string,
    formOfStudy: string,
    yearOfStart: number,
    yearOfEnd: number,
    subjects: ISubjectModel[],
    students: IStudentModel[]
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