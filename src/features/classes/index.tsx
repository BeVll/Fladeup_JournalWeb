
import {CardBody} from "@nextui-org/react";
import {Outlet} from "react-router-dom";
import {CustomCard} from "../../components/CustomCard.tsx";

export const Groups = () => {
    return (
       <div className={"z-0"}>
           <Outlet/>
       </div>

    );
};
