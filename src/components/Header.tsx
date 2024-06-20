import {
    Avatar,
    Button,
    Card,
    CardBody,
    cn,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger, Input
} from "@nextui-org/react";
import {BoxArrowLeft, Search} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import {AuthUserActionType, IAuthUser, ISidebar, IUser, SidebarActionType} from "../lib/store/types.ts";
import {formHttp, http} from "../http.ts";
import {useNavigate} from "react-router-dom";
import {ThemeSwitch} from "./ThemeSwitch.tsx";
import {FaUserCircle} from "react-icons/fa";
import {LuMenu} from "react-icons/lu";
import SidebarMobile from "./SidebarMobile.tsx";
import {useState} from "react";

export const Header = ({pageTitle}:{pageTitle:string}) => {
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isVisible } = useSelector((store: any) => store.sidebar as ISidebar);
    const logout = () => {
        delete http.defaults.headers.common["Authorization"];
        delete formHttp.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        dispatch({ type: AuthUserActionType.LOGOUT_USER });
        navigate("/login");
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center z-0 p-4 md:p-0">
                <div className="">
                    <h1 className="font-bold text-2xl">{pageTitle}</h1>
                </div>
                <div className="flex-row flex items-center gap-4">
                    <ThemeSwitch/>
                    <div className="hidden md:block">
                        <Input
                            classNames={{
                                base: "max-w-full sm:max-w-[10rem] h-10",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                            }}
                            className="sm:hidden md:block"
                            placeholder="Type to search..."
                            size="md"
                            startContent={<Search size={18}/>}
                            type="search"
                        />
                    </div>
                    <Button className={"md:hidden"} isIconOnly variant={"flat"} onPress={() => {
                        dispatch({
                            type: SidebarActionType.SET_VISIBLE, payload: true
                        });
                    }}>
                        <LuMenu size={25}/>
                    </Button>

                    <div className={"md:block hidden"}>
                        <Dropdown >
                            <DropdownTrigger>
                                <Button isIconOnly={true} variant={"flat"}>
                                    {
                                        user?.image ?  <Avatar className="w-unit-2xl h-unit-2xl"
                                                               src={import.meta.env.VITE_STORAGE_URL + user?.image}/>
                                            :
                                            <FaUserCircle size={36} color={"default"}/>
                                    }
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                                {/*<DropdownItem*/}
                                {/*    key="new"*/}
                                {/*    shortcut="⌘N"*/}
                                {/*    startContent={<AddNoteIcon className={iconClasses} />}*/}
                                {/*>*/}
                                {/*    New file*/}
                                {/*</DropdownItem>*/}

                                <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    onPress={logout}
                                    shortcut="⌘⇧D"
                                    startContent={<BoxArrowLeft className={"text-danger"}
                                                                onClick={() => {
                                                                }}/>}
                                >
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                </div>
            </div>

            <div className="block m-2 md:hidden sticky">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[10rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    className="sm:hidden md:block"
                    placeholder="Type to search..."
                    size="md"
                    startContent={<Search size={18}/>}
                    type="search"
                />
            </div>
        </div>
    );
};