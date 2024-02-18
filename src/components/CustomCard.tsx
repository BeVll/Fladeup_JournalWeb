import {Card} from "@nextui-org/react";
import {ReactNode} from "react";

export const CustomCard = ({children, className} : {children:ReactNode, className?:string}) => {
    return (
        <Card shadow={"none"} className={"border shadow-none rounded-none md:rounded-xl [&>p]:m-0 dark:border-default-100 dark:bg-default-200/20 " + className}>
            {children}
        </Card>
    );
};
