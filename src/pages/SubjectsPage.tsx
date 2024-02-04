import {Subjects} from "../features/subjects";
import {Header} from "../components/Header.tsx";


export const SubjectsPage = () => {
    return (
        <div className="flex flex-col w-full">
            <Header pageTitle={"Subjects"}/>
            <Subjects/>
        </div>

)
    ;
};