import {Button, Image, Input, Link} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "../features/auth/assets/EyeSlashFilledIcon.tsx";
import {EyeFilledIcon} from "../features/auth/assets/EyeFilledIcon.tsx";
import {useEffect, useState} from "react";
import logo from '../assets/logo.png';
import {useTheme} from "next-themes";
import {useFormik} from "formik";
import AuthApi from "../features/auth/api/AuthApi.ts";
import {formHttp, http} from "../http.ts";
import {jwtDecode} from "jwt-decode";
import {AuthUserActionType, IUser} from "../lib/store/types.ts";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
export const LoginPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleVisibility = () => setIsVisible(!isVisible);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks

        console.log(theme);
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            AuthApi.login(values).then(res => {
                localStorage.token = res.data.token;
                http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
                formHttp.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

                const user2 = jwtDecode(localStorage.token) as IUser;
                localStorage.user = user2;
                console.log(user2);
                dispatch({
                    type: AuthUserActionType.LOGIN_USER, payload: {
                        id: user2.id,
                        name: user2.name,
                        image: user2.image,
                        email: user2.email,
                        roles: user2.roles
                    } as IUser
                });

                navigate("/students");
            });
        },
    });

    return (
        <div className="min-w-unit-72 w-full p-5 ">

            <form className="flex-col flex items-center gap-4" onSubmit={formik.handleSubmit}>
                <div className="flex justify-between w-full items-center">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <Image className="rounded-xl" src={logo} width={40}/>

                </div>
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    variant={"faded"}
                    size={"sm"}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                <Input
                    variant={"faded"}
                    placeholder="Password"
                    name="password"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                    size={"sm"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                <Button type="submit" className="w-full" color={"primary"}>Login</Button>
                <Link size={"sm"} className="font-bold">Forgot password?</Link>
            </form>

        </div>
    );
};