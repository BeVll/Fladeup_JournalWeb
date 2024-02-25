import {Header} from "../../components/Header.tsx";
import {EditStudent} from "../../features/students/components/editStudent";
import {useParams} from "react-router-dom";
import {ToastContainer} from "react-toastify";

export const EditStudentPage = () => {
    const { id } = useParams();
    return (
        id &&
        <div className="flex flex-col w-full gap-4">
            <Header pageTitle={"Edit student"}/>
            <EditStudent id={parseInt(id)}/>


        </div>
    );
};
