import { IPageHyperlink, Roles } from "../Types";
import { AiFillHome, AiFillSetting, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import { CgLogOut } from 'react-icons/cg'

const getMenuItems = (role: Roles = Roles.NotAuthorized) => {
    let pages: IPageHyperlink[] = [];

    switch (role) {
        case Roles.Admin:
            pages = [
                { url: "/", name: "Home", icon: <AiFillHome /> },
                { url: "/settings", name: "Admin", icon: <AiFillSetting /> },
                { url: "/logout", name: "Logout", icon: <CgLogOut /> }
            ]
            break;
        case Roles.User:
            pages = [
                { url: "/", name: "Home", icon: <AiFillHome /> },
                { url: "/settings", name: "Settings", icon: <AiFillSetting /> },
                { url: "/logout", name: "Logout", icon: <CgLogOut /> }
            ]
            break;
        default:
            pages = [
                { url: "/", name: "Home", icon: <AiFillHome /> },
                { url: "/login", name: "Login", icon: <AiOutlineUser /> },
                { url: "/register", name: "Register", icon: <AiOutlineUserAdd /> },
            ]
            break;
    }
    return pages;
}

export default getMenuItems