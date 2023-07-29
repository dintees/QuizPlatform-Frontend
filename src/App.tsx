import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Layout from './components/common/Layout';
import "./assets/css/App.scss"
import { AiFillHome, AiFillSetting } from 'react-icons/ai'
import { IPageHyperlink } from './Types'
import Settings from './components/pages/Settings';

function App() {

  const pages: IPageHyperlink[] = [
    { url: "/", name: "Home", icon: <AiFillHome /> },
    { url: "/settings", name: "Settings", icon: <AiFillSetting /> },
  ];

  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout pages={pages} />}>
            <Route path='/' element={<Home />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
