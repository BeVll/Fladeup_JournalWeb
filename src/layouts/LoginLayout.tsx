import {Card, CardBody} from "@nextui-org/react";
import {Outlet} from "react-router-dom";
import {Container} from "../features/students/components/Container.tsx";

export const LoginLayout = () => {
    return (
        <div className="px-[20%] items-center  flex justify-center h-screen">
            <Container>
                <Outlet/>
            </Container>
        </div>
    );
};