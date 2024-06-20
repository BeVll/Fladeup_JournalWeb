import {EditTeacherAdresses} from "./EditAdresses.tsx";
import {EditPersonalTeacherInformation} from "./EditPersonalInformation.tsx";

export const EditTeacher = ({id}:{id:number}) => {

    return (
        <div className={"flex flex-col gap-10"}>
                <EditPersonalTeacherInformation id={id}/>
                <EditTeacherAdresses id={id}/>
        </div>
    );
};
