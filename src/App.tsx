import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Layout from './components/common/Layout';
import "./assets/css/App.scss"
import { IAuthContext, IAuthInformation } from './Types'
import Settings from './components/pages/Settings';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Logout from './components/pages/Logout';
import getMenuItems from './utils/getMenuItems';
import ProtectedComponent from './components/common/ProtectedComponent';
import { getDataFromToken } from './utils/authUtils';
import NotFound from './components/pages/NotFound';
import { Role } from './Enums';
import MySets from './components/pages/MySets';
import Set from './components/pages/Set';

export const AuthContext = createContext<IAuthContext>({
  auth: {
    id: 0,
    isAuthenticated: false,
    email: "",
    username: '',
    token: "",
    role: Role.NotAuthorized,
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
    role: Role.NotAuthorized,
    pages: getMenuItems()
  });

  useEffect(() => {
    const data = getDataFromToken();

    if (data) {
      setAuth((prev: IAuthInformation): IAuthInformation => {
        return { ...prev, isAuthenticated: true, email: data.email, username: data.username, role: data.role, pages: getMenuItems(data.role) }
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
              <Route path='/mysets' element={<ProtectedComponent component={<MySets />} />} />
              <Route path='/set/:setId?' element={<ProtectedComponent component={<Set />} />} />
              <Route path='/settings' element={<ProtectedComponent component={<Settings />} />} />

              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              <Route path='/logout' element={<ProtectedComponent component={<Logout />} />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

