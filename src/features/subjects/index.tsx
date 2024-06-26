
import {CardBody} from "@nextui-org/react";
import {Outlet} from "react-router-dom";
import {CustomCard} from "../../components/CustomCard.tsx";

export const Subjects = () => {
    return (
        <CustomCard>
            <CardBody>
                <Outlet/>
            </CardBody>
        </CustomCard>

    );
};
