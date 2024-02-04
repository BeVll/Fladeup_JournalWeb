import {ISubjectModel} from "../../subjects/types/subjects.ts";


export interface IGroupModel{
    id: number,
    name: string,
    shortName: string,
    formOfStudy: string,
    yearOfStart: number,
    yearOfEnd: number,
    subjects: ISubjectModel
}

export interface IGroupCreate{
    name: string,
    shortName: string,
    formOfStudy: string,
    yearOfStart: number,
    yearOfEnd: number
}