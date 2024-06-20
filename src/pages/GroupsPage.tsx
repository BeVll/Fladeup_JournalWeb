import {Header} from "../components/Header.tsx";
import {Subjects} from "../features/subjects";
import {Groups} from "../features/classes";

export const GroupsPage = () => {
    return (
        <div className="flex flex-col -z-0 gap-4 w-full">
            <Header pageTitle={"Groups"}/>
            <Groups/>
        </div>
    );
};
