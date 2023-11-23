import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { IPageHyperlink } from '../../Types'

interface Props {
    pages: IPageHyperlink[]
}

function Layout(props: Props) {

    const [isOpened, setIsOpened] = useState<boolean>(true);

    const hadleOpenArrowClick = () => {
        setIsOpened(!isOpened);
    }

    return (
        <>
            <div id='sidebar-container'>
                <Sidebar pages={props.pages} isOpened={isOpened} handleOpenArrowClick={hadleOpenArrowClick} />
            </div>
            <div id="content-container" className={isOpened ? 'sidebar-open' : ''}>
                <Navbar />
                <div id="content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout
