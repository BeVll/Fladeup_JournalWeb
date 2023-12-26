import {Outlet} from "react-router-dom";
import {Sidebar} from "../components/Sidebar.tsx";

export const Layout = () => {
    return (
        <div className="">
            <Sidebar/>
            <div className="flex-col ml-[100px] p-4 flex">
                <Outlet/>
            </div>
        </div>
    );
};