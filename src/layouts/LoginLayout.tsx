import {Card, CardBody} from "@nextui-org/react";
import {Outlet} from "react-router-dom";

export const LoginLayout = () => {
    return (
        <div className="px-[20%] items-center  flex justify-center h-screen">
            <Card  className="border-default-200 p-2 border px-4 my-6 py-3 rounded-xl [&>p]:m-0 dark:border-default-100 bg-default-200/20">
                <CardBody>

                </CardBody>
            </Card>
        </div>
    );
};