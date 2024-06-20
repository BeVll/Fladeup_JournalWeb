import {Outlet, useLocation} from "react-router-dom";
import {Sidebar} from "../components/Sidebar.tsx";
import {Bounce, ToastContainer} from "react-toastify";
import {useTheme} from "next-themes";
import 'react-toastify/dist/ReactToastify.css';
import SidebarMobile from "../components/SidebarMobile.tsx";
import {useDispatch, useSelector} from "react-redux";
import {IAuthUser, ISidebar, SidebarActionType} from "../lib/store/types.ts";
import {useEffect} from "react";
export const Layout = () => {
    const { theme, setTheme } = useTheme();
    const { isVisible } = useSelector((store: any) => store.sidebar as ISidebar);
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch({
            type: SidebarActionType.SET_VISIBLE, payload: false
        });
    }, [location]);
    return (
        <>

            <div className="relative ">
                <Sidebar/>
                <div
                    className={`flex w-screen h-[100dvh] fixed inset-0 z-50 overflow-x-auto justify-center [--scale-enter:100%] [--scale-exit:100%] [--slide-enter:0px] [--slide-exit:80px] sm:[--scale-enter:100%] sm:[--scale-exit:103%] sm:[--slide-enter:0px] sm:[--slide-exit:0px] items-center sm:items-center ${isVisible ? "block" : "hidden"}`}>
                    <SidebarMobile/>
                </div>
                <ToastContainer
                    position="bottom-right"
                    theme={theme}
                />
                <div className="flex-col md:ml-[100px] md:p-4 flex ">
                    <Outlet/>
                </div>
            </div>
        </>

    );
};