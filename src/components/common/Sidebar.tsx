import React from 'react'
import { IPageHyperlink } from '../../Types'
import SidebarTile from './SidebarTile'
import { MdQuiz } from "react-icons/md"
import { AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

interface Props {
    isOpened: boolean,
    handleOpenArrowClick: () => void,
    pages: IPageHyperlink[]
}

function Sidebar(props: Props) {
    const navigate = useNavigate();

    return (
        <div id="sidebar" className={props.isOpened ? "" : "sidebar-collapsed"}>
            <div id="logo">
                <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}><MdQuiz />QP</div>
                <div className={props.isOpened ? "" : "logo-collapsed"}><AiOutlineLeft onClick={props.handleOpenArrowClick} /></div>
            </div>
            <div id='menu'>
                {props.pages.map((i) =>
                    <SidebarTile key={i.url} icon={i.icon} name={i.name} href={i.url} />
                )}
            </div>
        </div>
    )
}

export default Sidebar
