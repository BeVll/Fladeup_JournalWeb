import {Card} from "@nextui-org/react";
import {ReactNode} from "react";

export const CustomCard = ({children, className} : {children:ReactNode, className?:string}) => {
    return (
        <Card className={"border shadow-nonerounded-none md:rounded-xl [&>p]:m-0 dark:border-default-100 dark:bg-default-200/20 " + className}>
            {children}
        </Card>
    );
};
