import {Card, CardBody} from "@nextui-org/react";

export const Container = ({children} : {children: any}) => {
    return (
        <Card className={"rounded-[40px] w-full bg-content1/50"}>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    );
};
