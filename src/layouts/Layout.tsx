import {Outlet} from "react-router-dom";
import {Sidebar} from "../components/Sidebar.tsx";
import {Bounce, ToastContainer} from "react-toastify";
import {useTheme} from "next-themes";

export const Layout = () => {
    const { theme, setTheme } = useTheme();

    return (
        <>

            <div className="relative">
                <Sidebar/>
                <ToastContainer
                    position="bottom-right"
                    theme={theme}
                />
                <div className="flex-col md:ml-[100px] md:p-4 flex">
                    <Outlet/>
                </div>
            </div>
        </>

    );
};