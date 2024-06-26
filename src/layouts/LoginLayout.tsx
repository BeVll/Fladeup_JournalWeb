import {Card, CardBody} from "@nextui-org/react";
import {Outlet} from "react-router-dom";
import {Container} from "../features/students/components/Container.tsx";

export const LoginLayout = () => {
    return (
        <div className="md:px-[40%] px-[15px] w-full items-center  flex justify-center h-screen">
            <Container>
                <Outlet/>
            </Container>
        </div>
    );
};