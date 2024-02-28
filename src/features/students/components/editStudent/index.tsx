import {EditAdresses} from "./EditAdresses.tsx";
import {EditPersonalInformation} from "./EditPersonalInformation.tsx";

export const EditStudent = ({id}:{id:number}) => {


    return (
        <div className={"flex flex-col gap-10"}>
                <EditPersonalInformation id={id}/>
                <EditAdresses id={id}/>
        </div>
    );
};
