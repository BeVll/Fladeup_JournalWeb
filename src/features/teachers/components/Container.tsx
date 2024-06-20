import {Card, CardBody} from "@nextui-org/react";

export const Container = ({children} : {children: any}) => {
    return (
        <Card className={"rounded-[40px] bg-[rgba(217, 217, 217, 0.15000000596046448)]"}>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    );
};
