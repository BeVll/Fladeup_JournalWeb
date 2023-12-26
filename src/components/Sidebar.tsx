import {Button, Image, Link, Tooltip} from "@nextui-org/react";
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
export const Sidebar = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="h-screen fixed items-center flex-col flex justify-between border-default-200 p-4 w-[100px] border-r dark:border-default-100 bg-default-200/10">
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
                        "Home"
                    }
                >
                    <Button className={"w-[20px]"}>
                        <House/>
                    </Button>
                </Tooltip>
                <Tooltip
                    className={theme}
                    color={"default"}
                    placement="right"
                    size={"lg"}
                    content={
                        "Students & Teachers"
                    }
                >
                    <Button className={"w-[20px]"}>
                        <People/>
                    </Button>
                </Tooltip>
                <Tooltip
                    className={theme}
                    color={"default"}
                    placement="right"
                    size={"lg"}
                    content={
                        "Subjects"
                    }
                >
                    <Button className={"w-[20px]"}>
                        <Collection/>
                    </Button>
                </Tooltip>
                <Tooltip
                    className={theme}
                    color={"default"}
                    placement="right"
                    size={"lg"}
                    content={
                        "Events"
                    }
                >
                    <Button className={"w-[20px]"}>
                        <Calendar2Event/>
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
                    <Link href="" color={"danger"} className={""}>
                        <Power size={24}/>
                    </Link>
                </Tooltip>
            </div>
        </div>
    );
};