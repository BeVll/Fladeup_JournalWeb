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
import {AuthUserActionType, IAuthUser} from "../lib/store/types.ts";
import {formHttp, http} from "../http.ts";
import {useNavigate} from "react-router-dom";

export const Header = ({pageTitle}:{pageTitle:string}) => {
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        delete http.defaults.headers.common["Authorization"];
        delete formHttp.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        dispatch({ type: AuthUserActionType.LOGOUT_USER });
        navigate("/login");
    }

    return (
        <div className="flex justify-between items-center z-0">
            <div className="">
                <h1 className="font-bold text-2xl">{pageTitle}</h1>
            </div>
            <div className="flex-row flex items-center gap-4">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[10rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="md"
                    startContent={<Search size={18} />}
                    type="search"
                />
                <Dropdown >
                    <DropdownTrigger>
                        <Avatar className="w-unit-2xl h-unit-2xl"  src={import.meta.env.VITE_STORAGE_URL+user?.image} />
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
                            
                            shortcut="⌘⇧D"
                            startContent={<BoxArrowLeft className={"text-danger"}
                            onClick={() => {}}/>}
                        >
                            <Button onClick={logout}>
                                Logout
                            </Button>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};