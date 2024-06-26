import {Button, Image, Link, Tooltip, useDisclosure} from "@nextui-org/react";
import logo from '../assets/logo.png';
import {
    Calendar2Event,
    Calendar3,
    Calendar3Event,
    CalendarEvent,
    Collection,
    House,
    People, Power
} from "react-bootstrap-icons";
import {useTheme} from "next-themes";
import {useNavigate} from "react-router-dom";
import {PiStudentBold} from "react-icons/pi";
import {FaPeopleGroup} from "react-icons/fa6";
import {GiTeacher} from "react-icons/gi";
import {formHttp, http} from "../http.ts";
import {AuthUserActionType} from "../lib/store/types.ts";
import {useDispatch} from "react-redux";
export const Sidebar = () => {
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
        <div className="h-screen hidden md:flex fixed items-center flex-col flex justify-between bg-content1 border-default-200 p-4 w-[100px] border-r dark:border-default-100 dark:bg-default-200/20">
            <div>
                <Image src={logo} width={50}/>
            </div>
            <div className="flex flex-col gap-2">

                <Tooltip
                    className={theme}
                    color={"default"}
                    placement="right"
                    size={"lg"}

                    content={
                        "Students"
                    }
                >
                    <Button className={"w-[20px]"} onClick={() => {navigate("/students")}}>
                        <PiStudentBold />
                    </Button>
                </Tooltip>
                <Tooltip
                    className={theme}
                    color={"default"}
                    placement="right"
                    size={"lg"}

                    content={
                        "Teachers"
                    }
                >
                    <Button className={"w-[20px]"} onClick={() => {navigate("/teachers")}}>
                        <GiTeacher  />
                    </Button>
                </Tooltip>
                <Tooltip
                    className={theme}
                    color={"default"}
                    placement="right"
                    size={"lg"}
                    onSelect={() => {
                        console.log("dsada");
                    }}

                    content={
                        "Subjects"
                    }
                >
                    <Button className={"w-[20px]"} onClick={() => {navigate("/subjects")}}>
                        <Collection/>
                    </Button>
                </Tooltip>
                <Tooltip
                    className={theme}
                    color={"default"}
                    placement="right"
                    size={"lg"}
                    onSelect={() => {
                        console.log("dsada");
                    }}
                    content={"Groups"}
                >
                    <Button className={"w-[20px]"} onClick={() => {navigate("/groups")}}>
                        <FaPeopleGroup />
                    </Button>
                </Tooltip>
            </div>
            <div>
                <Tooltip
                    className={theme}
                    color={"danger"}
                    placement="right"
                    size={"lg"}

                    content={
                        "Logout"
                    }
                >
                    <Button onPress={logout} isIconOnly variant={"flat"} href="" color={"danger"} className={""}>
                        <Power size={24}/>
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};