import {Header} from "../../components/Header.tsx";
import {useParams} from "react-router-dom";
import {EditTeacher} from "../../features/teachers/components/editTeacher";

export const EditTeacherPage = () => {
    const { id } = useParams();
    return (
        id &&
        <div className="flex flex-col w-full gap-4">
            <Header pageTitle={"Edit teacher"}/>
            <EditTeacher id={parseInt(id)}/>
        </div>
    );
};
