
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect} from "react";
import {AuthUserActionType, IAuthUser, IUser} from "./lib/store/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {LoginLayout} from "./layouts/LoginLayout.tsx";
import {Home} from "./pages/Home.tsx";
import {Layout} from "./layouts/Layout.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import bg from './assets/bg.png';
import bg2 from './assets/bg-left.png';
import {useTheme} from "next-themes";
import {formHttp, http} from "./http.ts";
import {jwtDecode} from "jwt-decode";
import {SubjectsPage} from "./pages/SubjectsPage.tsx";
import {ListSubjects} from "./features/subjects/components/ListSubjects.tsx";
import {GroupsPage} from "./pages/GroupsPage.tsx";
import {ListGroups} from "./features/classes/components/ListGroups.tsx";
import {ListStudents} from "./features/students/components/listStudent";
import {ViewGroup} from "./features/classes/components/ViewGroup.tsx";
import {ViewStudentPage} from "./pages/students/ViewStudentPage.tsx";
import {CreateStudentPage} from "./pages/students/CreateStudentPage.tsx";
import {ListStudentsPage} from "./pages/students/ListStudentsPage.tsx";

function App() {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((store: any) => store.auth as IAuthUser);
    const { theme } = useTheme();

    useEffect(() => {
        if (localStorage.token) {
            http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
            formHttp.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

            const user2 = jwtDecode(localStorage.token) as IUser;

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

        }
    }, []);

    return (


      <>
          {
              theme == "dark" &&

                  <div className="-z-20 light:hidden">
                      <div aria-hidden="true"
                           className="fixed light:hidden light:opacity-0 dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] -z-20 rotate-12">
                          <img src={bg}
                               className="relative -z-20 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                               alt="docs right background" data-loaded="true"/></div>

                      <div aria-hidden="true"
                           className="fixed light:opacity-0 z dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] -z-20">
                          <img src={bg2}
                               className="relative -z-20 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                               alt="docs left background" data-loaded="true"/></div>
                      <div className="backdrop-blur-3xl fixed h-screen w-full">

                      </div>
                  </div>

          }


          {/*<main className={theme + " z-20"}>*/}

              <BrowserRouter>
                  {
                      isAuth ?
                          <Routes>
                              <Route path="/" element={<Layout/>}>
                                  <Route index element={<Home/>}/>
                                  <Route path="subjects" element={<SubjectsPage/>}>
                                      <Route index element={<ListSubjects/>}/>
                                  </Route>
                                  <Route path="groups" element={<GroupsPage/>}>
                                      <Route index element={<ListGroups/>}/>
                                      <Route path="view/:id" element={<ViewGroup/>}/>
                                  </Route>
                                  <Route path="students">
                                      <Route index element={<ListStudentsPage/>}/>
                                      <Route path="view/:id" element={<ViewStudentPage/>}/>
                                      <Route path="create" element={<CreateStudentPage/>}/>
                                  </Route>
                              </Route>
                          </Routes>
                          :
                          <Routes>
                              <Route path="/login" element={<LoginLayout/>}>
                                  <Route index element={<LoginPage/>}/>
                              </Route>
                          </Routes>
                  }
              </BrowserRouter>
      </>


  )
}

export default App
