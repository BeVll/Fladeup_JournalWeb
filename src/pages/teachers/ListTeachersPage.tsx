import {Header} from "../../components/Header.tsx";
import {ListStudents} from "../../features/students/components/listStudent";
import {ListTeachers} from "../../features/teachers/components/listTeacher";

export const ListTeachersPage = () => {
    return (
        <div className="flex flex-col w-full gap-4">
            <Header pageTitle={"Teachers"}/>
            <ListTeachers/>
        </div>
    );
};
