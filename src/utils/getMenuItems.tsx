import { IPageHyperlink } from "../Types";
import { AiFillHome, AiFillSetting, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai'
import { MdQuiz } from 'react-icons/md'
import { CgLogOut } from 'react-icons/cg'
import { FaUserCircle } from 'react-icons/fa'
import { Role } from "../Enums";

const getMenuItems = (role: Role = Role.NotAuthorized) => {
    let pages: IPageHyperlink[] = [];

    switch (role) {
        case Role.Admin:
            pages = [
                { url: "/", name: "Home", icon: <AiFillHome /> },
                { url: "/mytests", name: "My Tests", icon: <MdQuiz /> },
                { url: "/account", name: "Account", icon: <FaUserCircle />},
                { url: "/settings", name: "Admin", icon: <AiFillSetting /> },
                { url: "/logout", name: "Logout", icon: <CgLogOut /> }
            ]
            break;
        case Role.User:
            pages = [
                { url: "/", name: "Home", icon: <AiFillHome /> },
                { url: "/mytests", name: "My Tests", icon: <MdQuiz /> },
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