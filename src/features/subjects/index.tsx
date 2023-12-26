import {ListSubjects} from "./components/ListSubjects.tsx";
import {Card, CardBody} from "@nextui-org/react";
import {Outlet} from "react-router-dom";

export const Subjects = () => {
    return (
        <Card  className="p-2 border md:px-4  dark:shadow-none my-6 py-3 rounded-none md:rounded-xl [&>p]:m-0 dark:border-default-100 dark:bg-default-200/20">
            <CardBody>
                <Outlet/>

            </CardBody>
        </Card>

    );
};
