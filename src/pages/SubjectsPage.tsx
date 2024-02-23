import {Subjects} from "../features/subjects";
import {Header} from "../components/Header.tsx";


export const SubjectsPage = () => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Header pageTitle={"Subjects"}/>
            <Subjects/>
        </div>

)
    ;
};