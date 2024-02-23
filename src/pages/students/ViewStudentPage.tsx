import {Header} from "../../components/Header.tsx";
import {ViewStudent} from "../../features/students/components/viewStudent";
import {useParams} from "react-router-dom";

export const ViewStudentPage = () => {
    const { id } = useParams();

    return (
        <div className="flex flex-col w-full gap-4">
            <Header pageTitle={"View Student"}/>
            <ViewStudent id={id}/>
        </div>
    );
};
