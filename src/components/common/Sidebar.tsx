import React from 'react'
import { IPageHyperlink } from '../../Types'
import SidebarTile from './SidebarTile'
import { MdQuiz } from "react-icons/md"

interface Props {
    pages: IPageHyperlink[]
}

function Sidebar(props: Props) {
    return (
        <div id="sidebar">
            <div id="logo">
                <MdQuiz /> QuizPlatform
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
