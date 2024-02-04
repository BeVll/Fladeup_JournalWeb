import {Card} from "@nextui-org/react";
import {ReactNode} from "react";

export const CustomCard = ({children, className} : {children:ReactNode, className?:string}) => {
    return (
        <Card className={"p-2 border md:px-4 shadow-none my-6 py-3 rounded-none md:rounded-xl [&>p]:m-0 dark:border-default-100 dark:bg-default-200/20 " + className}>
            {children}
        </Card>
    );
};
