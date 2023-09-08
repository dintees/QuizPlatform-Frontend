import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Layout from './components/common/Layout';
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
import MyTests from './components/pages/MyTests';
import Test from './components/pages/Test';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./assets/css/App.scss"


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
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" transition={Flip} />

        <BrowserRouter>
          <Routes>
            <Route element={<Layout pages={auth.pages} />}>
              <Route path='/' element={<Home />} />
              <Route path='/mytests' element={<ProtectedComponent component={<MyTests />} />} />
              <Route path='/test/:mode/:setId?' element={<ProtectedComponent component={<Test />} />} />
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

