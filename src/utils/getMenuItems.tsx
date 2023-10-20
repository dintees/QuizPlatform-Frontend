import { IPageHyperlink } from "../Types";
import { AiFillHome, AiFillSetting, AiOutlineUser, AiOutlineUserAdd, AiFillPlayCircle, AiFillProfile } from 'react-icons/ai'
import { MdQuiz, MdFolderShared } from 'react-icons/md'
import { CgLogOut } from 'react-icons/cg'
import { FaUserCircle } from 'react-icons/fa'
import { PiCardsFill } from 'react-icons/pi'
import { Role } from "../Enums";

const getMenuItems = (role: Role = Role.NotAuthorized) => {
    let pages: IPageHyperlink[] = [];

    switch (role) {
        case Role.Admin:
            pages = [
                { url: "/", name: "Home", icon: <AiFillHome /> },
                { url: "/admin", name: "Admin", icon: <AiFillSetting /> },
                { url: "/account", name: "Account", icon: <FaUserCircle /> },
                { url: "/usersessions", name: "Active sessions", icon: <AiFillProfile /> },
                { url: "/logout", name: "Logout", icon: <CgLogOut /> }
            ]
            break;
        case Role.User:
            pages = [
                { url: "/", name: "Home", icon: <AiFillHome /> },
                { url: "/tests", name: "Shared tests", icon: <MdFolderShared /> },
                { url: "/mytests", name: "My Tests", icon: <MdQuiz /> },
                { url: "/flashcards", name: "Flashcards", icon: <PiCardsFill /> },
                { url: "/history", name: "History", icon: <AiFillPlayCircle /> },
                { url: "/account", name: "Account", icon: <FaUserCircle /> },
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