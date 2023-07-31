import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Layout from './components/common/Layout';
import "./assets/css/App.scss"
import { AiFillHome, AiFillSetting, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import { IPageHyperlink } from './Types'
import Settings from './components/pages/Settings';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Loader from './components/common/Loader';

function App() {

  const pages: IPageHyperlink[] = [
    { url: "/", name: "Home", icon: <AiFillHome /> },
    { url: "/settings", name: "Settings", icon: <AiFillSetting /> },
    { url: "/login", name: "Login", icon: <AiOutlineUser /> },
    { url: "/register", name: "Register", icon: <AiOutlineUserAdd /> },
  ];


  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout pages={pages} />}>
            <Route path='/' element={<Home />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
