import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Layout from './components/common/Layout';
import "./assets/css/App.scss"
import { AiFillHome, AiFillSetting, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import { CgLogOut } from 'react-icons/cg'
import { IAuthContext, IAuthInformation, IPageHyperlink } from './Types'
import Settings from './components/pages/Settings';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Logout from './components/pages/Logout';

export const AuthContext = createContext<IAuthContext>({
  auth: { token: "", pages: [] },
  setAuth: () => { }
})

function App() {

  let pages: IPageHyperlink[] = [
    { url: "/", name: "Home", icon: <AiFillHome /> },
    { url: "/settings", name: "Settings", icon: <AiFillSetting /> },
    { url: "/login", name: "Login", icon: <AiOutlineUser /> },
    { url: "/register", name: "Register", icon: <AiOutlineUserAdd /> },
  ];

  const [auth, setAuth] = useState<IAuthInformation>({
    token: "", pages
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token)
      setAuth((prev: IAuthInformation) => {
        return {
          ...prev, pages: [{ url: "/", name: "Home", icon: <AiFillHome /> }, {
            url: "/logout", name: "Logout", icon: <CgLogOut />
          }], token
        }
      })
  }, []);


  return (
    <div id="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout pages={auth.pages} />}>
              <Route path='/' element={<Home />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/logout' element={<Logout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

