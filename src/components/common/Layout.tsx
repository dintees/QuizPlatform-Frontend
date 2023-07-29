import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { IPageHyperlink } from '../../Types'

interface Props {
    pages: IPageHyperlink[]
 }

function Layout(props: Props) {
    return (
        <>
            <div id='sidebar-container'>
                <Sidebar pages={props.pages} />
            </div>
            <div id="content-container">
                <Navbar />
                <div id="content">
                <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout
