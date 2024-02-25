import {EditAdresses} from "./EditAdresses.tsx";

export const EditStudent = ({id}:{id:number}) => {


    return (
        <div className={"grid grid-cols-2"} style={{gridTemplateColumns: "60% auto"}} >
            <EditAdresses id={id}/>
        </div>
    );
};
