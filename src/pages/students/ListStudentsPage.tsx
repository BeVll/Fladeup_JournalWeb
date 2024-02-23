import {Header} from "../../components/Header.tsx";
import {ListStudents} from "../../features/students/components/listStudent";

export const ListStudentsPage = () => {
    return (
        <div className="flex flex-col w-full gap-4">
            <Header pageTitle={"Students"}/>
            <ListStudents/>
        </div>
    );
};
