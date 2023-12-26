import React, {useEffect, useState} from "react";
import {Switch, VisuallyHidden, useSwitch} from "@nextui-org/react";
import {MoonIcon} from "../assets/MoonIcon.tsx";
import {SunIcon} from "../assets/SunIcon.tsx";
import {useTheme} from "next-themes";
"use client";
export const ThemeSwitch = (props:any) => {
    const { theme, setTheme } = useTheme();
    const [isSelected, setIsSelected] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if(theme == "dark")
            setIsSelected(false);
        else
            setIsSelected(true);
    }, []);

    const changeTheme = () => {
        isSelected ? setIsSelected(false) : setIsSelected(true);

        if(isSelected)
            setTheme("dark");
        else
            setTheme("light");
    }



    return (
        <div className="flex flex-col gap-2">
            <Switch
                size="lg"
                color="default"

                isSelected={isSelected}
                onValueChange={changeTheme}
                thumbIcon={({className }) =>
                    isSelected ? (
                        <SunIcon className={className} />
                    ) : (
                        <MoonIcon className={className} />
                    )
                }
            >
            </Switch>
        </div>
    )
}