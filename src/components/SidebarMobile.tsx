import React from 'react';
import {useTheme} from "next-themes";
import {useNavigate} from "react-router-dom";
import {Button, Image, Link, Tooltip, useDisclosure} from "@nextui-org/react";
import logo from "../assets/logo.png";
import {PiStudentBold} from "react-icons/pi";
import {GiTeacher} from "react-icons/gi";
import {Collection, Power} from "react-bootstrap-icons";
import {FaPeopleGroup} from "react-icons/fa6";
import {AuthUserActionType, SidebarActionType} from "../lib/store/types.ts";
import {LuMenu} from "react-icons/lu";
import {useDispatch} from "react-redux";
import {GrClose} from "react-icons/gr";
import {formHttp, http} from "../http.ts";

const SidebarMobile = () => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const dispatch = useDispatch();

    const logout = () => {
        delete http.defaults.headers.common["Authorization"];
        delete formHttp.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        dispatch({ type: AuthUserActionType.LOGOUT_USER });
        navigate("/login");
    }

    return (
        <div className="min-h-screen  fixed min-w-full md:flex gap-[160px] items-start flex-col flex justify-start bg-content1 border-default-200 p-4 z-50 border-r dark:border-default-100 dark:bg-black">
            <div className={"w-full flex justify-between"}>
                <Image src={logo} width={50}/>
                <Button isIconOnly variant={"flat"} onPress={() => {
                    dispatch({
                        type: SidebarActionType.SET_VISIBLE, payload: false
                    });
                }}>
                    <GrClose size={25}/>
                </Button>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <Button className={"w-full"} onClick={() => {
                    navigate("/students")
                }}>
                    <PiStudentBold/>
                    <span>Students</span>
                </Button>
                <Button className={"w-full"} onClick={() => {
                    navigate("/teachers")
                }}>
                    <GiTeacher/>
                    <span>Teachers</span>
                </Button>
                <Button className={"w-full"} onClick={() => {
                    navigate("/subjects")
                }}>
                    <Collection/>
                    <span>Subjects</span>
                </Button>
                <Button className={"w-full"} onClick={() => {navigate("/groups")}}>
                        <FaPeopleGroup />
                        <span>Groups</span>
                    </Button>
                <Button className={"w-full"} variant={"shadow"} color={"danger"} onPress={logout}>
                    <Power size={24}/>
                    <span>Logout</span>
                </Button>
            </div>

        </div>
    );
};

export default SidebarMobile;