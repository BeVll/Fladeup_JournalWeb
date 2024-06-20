import {Header} from "../../components/Header.tsx";
import {CustomCard} from "../../components/CustomCard.tsx";
import {CardBody} from "@nextui-org/react";
import {CreateStudent} from "../../features/students/components/createStudent";
import {CreateTeacher} from "../../features/teachers/components/createTeacher";
export const CreateTeacherPage = () => {
    return (
        <div className="flex flex-col w-full gap-4">
            <Header pageTitle={"Create student"}/>
            <CustomCard>
                <CardBody className={"p-4"}>
                    <CreateTeacher/>
                </CardBody>
            </CustomCard>

        </div>
    );
};
