import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Layout from './components/common/Layout';
import "./assets/css/App.scss"
import { IAuthContext, IAuthInformation, Roles } from './Types'
import Settings from './components/pages/Settings';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Logout from './components/pages/Logout';
import getMenuItems from './utils/getMenuItems';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext<IAuthContext>({
  auth: {
    id: 0,
    isAuthenticated: false,
    email: "",
    username: '',
    token: "",
    role: Roles.NotAuthorized,
    pages: []
  },
  setAuth: () => { }
})

function App() {

  const [auth, setAuth] = useState<IAuthInformation>({
    id: 0,
    isAuthenticated: false,
    email: "",
    username: "",
    token: "",
    role: Roles.NotAuthorized,
    pages: getMenuItems()
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const jwt: any = jwtDecode(token);

      const exp = new Date(jwt["exp"] * 1000);
      if (exp < new Date()) {
        localStorage.removeItem("token")
        return;
      }

      setAuth((prev: IAuthInformation): IAuthInformation => {
        const role = Roles[jwt["RoleName"] as keyof typeof Roles]
        return { ...prev, isAuthenticated: true, username: jwt["Username"], email: jwt["Email"], pages: getMenuItems(role) }
      })
    }
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

