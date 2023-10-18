import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Layout from './components/common/Layout';
import { IAuthContext, IAuthInformation } from './Types'
import Admin from './components/pages/Admin';
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
import 'katex/dist/katex.min.css';
import Account from './components/pages/Account';
import SolveTest from './components/pages/SolveTest';
import TestHistory from './components/pages/TestHistory';
import ForgotPassword from './components/pages/ForgotPassword';
import FlashcardsList from './components/pages/FlashcardsList';
import Flashcards from './components/pages/Flashcards';
import UserSessions from './components/pages/UserSessions';
import Tests from './components/pages/Tests';


export const AuthContext = createContext<IAuthContext>({
  auth: {
    isAuthenticated: false,
    email: "",
    username: '',
    firstname: '',
    lastname: '',
    token: "",
    role: Role.NotAuthorized,
    pages: []
  },
  setAuth: () => { }
})

function App() {

  const [auth, setAuth] = useState<IAuthInformation>({
    isAuthenticated: false,
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    token: "",
    role: Role.NotAuthorized,
    pages: getMenuItems()
  });

  useEffect(() => {
    const data = getDataFromToken();

    if (data) {
      setAuth((prev: IAuthInformation): IAuthInformation => {
        return { ...prev, isAuthenticated: true, email: data.email, username: data.username, firstname: data.firstname, lastname: data.lastname, role: data.role, pages: getMenuItems(data.role) }
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
              <Route path='/tests' element={<ProtectedComponent component={<Tests />} />} />
              <Route path='/mytests' element={<ProtectedComponent component={<MyTests />} />} />
              <Route path='/test/:mode/:testId?' element={<ProtectedComponent component={<Test />} />} />
              <Route path='/solveTest/:testId' element={<ProtectedComponent component={<SolveTest />} />} />
              <Route path='/history' element={<ProtectedComponent component={<TestHistory />} />} />
              <Route path='/flashcards/' element={<ProtectedComponent component={<FlashcardsList />} />} />
              <Route path='/flashcards/:mode?/:flashcardId?' element={<ProtectedComponent component={<Flashcards />} />} />

              <Route path='/account' element={<ProtectedComponent component={<Account />} />} />
              <Route path='/usersessions' element={<ProtectedComponent component={<UserSessions />} />} />
              <Route path='/admin' element={<ProtectedComponent component={<Admin />} />} />

              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgotpassword' element={<ForgotPassword />} />

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

