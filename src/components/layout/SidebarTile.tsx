import React from 'react'
import { NavLink } from 'react-router-dom'

interface Props {
    icon: JSX.Element,
    name: string,
    href: string
}

function SidebarTile(props: Props) {
    return (
        <NavLink to={props.href}>
            <div className="sidebar-tile">
                <div className="sidebar-tile-icon">{props.icon}</div>
                <div className="sidebar-tile-name">{props.name}</div>
            </div>
        </NavLink>
    )
}

export default SidebarTile
