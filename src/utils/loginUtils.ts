import { postData } from "../AxiosHelper";
import { Role } from "../Enums";
import { ILogin, IRegister } from "../Types";
import { getToken, modifyToken, removeToken } from "./authUtils"
import getMenuItems from "./getMenuItems";


export const signOut = () => {
    removeToken();
}

export const signInAsync = async (login: ILogin) => {
    const loggedData = await postData("User/login", login, false)
    if (loggedData?.status === 200) {
        const data = loggedData.data;
        const role = Role[data.role as keyof typeof Role];

        modifyToken(data.token);
        return { id: data.id, isAuthenticated: true, username: data.username, email: data.email, role: role, pages: getMenuItems(role), token: data.token }
    } else if (loggedData?.status === 401)
        return { isAuthenticated: false, errorMessage: loggedData.data };
    else
        return { isAuthenticated: false, errorMessage: "Problem with server connection" };
}

export const registerAsync = async (register: IRegister) => {
    const registrationData = await postData("User/register", register, false)
    console.log(registrationData);

    if (registrationData?.status === 200) {
        const data = registrationData.data;
        const role = Role[data.role as keyof typeof Role];

        modifyToken(data.token);
        return { id: data.id, isAuthenticated: true, username: data.username, email: data.email, role: role, pages: getMenuItems(role), token: data.token }
    } else if (registrationData?.status === 400)
        return { isAuthenticated: false, errorMessage: registrationData.data };
    else
        return { isAuthenticated: false, errorMessage: "Problem with server connection" };
}

export const isAuthenticated = (): boolean => {
     return (getToken() !== null)
}