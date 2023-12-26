import {Subjects} from "../features/subjects";
import {Header} from "../components/Header.tsx";
import {LoginLayout} from "../layouts/LoginLayout.tsx";
import {Route} from "react-router-dom";
import {LoginPage} from "./LoginPage.tsx";
import {CreateSubject} from "../features/subjects/components/CreateSubject.tsx";

export const SubjectsPage = () => {
    return (
        <div className="flex flex-col w-full">
            <Header pageTitle={"Subjects"}/>
            <Subjects/>
        </div>

)
    ;
};