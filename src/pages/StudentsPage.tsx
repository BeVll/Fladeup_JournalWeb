import {Header} from "../components/Header.tsx";
import {Students} from "../features/students";

export const StudentsPage = () => {
    return (
        <div className="flex flex-col w-full">
            <Header pageTitle={"Students"}/>
            <Students/>
        </div>
    );
};
