import {Header} from "../../components/Header.tsx";
import {ViewStudent} from "../../features/students/components/viewStudent";
import {useParams} from "react-router-dom";
import {ViewTeacher} from "../../features/teachers/components/viewTeacher";

export const ViewTeacherPage = () => {
    const { id } = useParams();

    return (
        <div className="flex flex-col w-full gap-4">
            <Header pageTitle={"View Teacher"}/>
            <ViewTeacher id={id}/>
        </div>
    );
};
