import { IPageHyperlink } from "../Types";
import { AiFillHome, AiFillSetting, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import { BsXDiamondFill } from 'react-icons/bs'
import { CgLogOut } from 'react-icons/cg'
import { Role } from "../Enums";

const getMenuItems = (role: Role = Role.NotAuthorized) => {
    let pages: IPageHyperlink[] = [];

    switch (role) {
        case Role.Admin:
            pages = [
                { url: "/", name: "Home", icon: <AiFillHome /> },
                { url: "/mysets", name: "My Sets", icon: <BsXDiamondFill /> },
                { url: "/settings", name: "Admin", icon: <AiFillSetting /> },
                { url: "/logout", name: "Logout", icon: <CgLogOut /> }
            ]
            break;
        case Role.User:
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