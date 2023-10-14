import { postData } from "../AxiosHelper";
import { ILogin, IRegister } from "../Types";
import { getDataFromToken, getToken, modifyToken, removeToken } from "./authUtils"
import getMenuItems from "./getMenuItems";


export const signOut = () => {
    removeToken();
}

export const signInAsync = async (login: ILogin) => {
    const loggedData = await postData("User/login", login, false)
    if (loggedData?.status === 200) {
        const token = loggedData?.data;

        modifyToken(token);
        const data = getDataFromToken();
        if (data !== null)
            return { isAuthenticated: true, username: data.username, firstname: data.firstname, lastname: data.lastname, email: data.email, role: data.role, pages: getMenuItems(data.role), token: token }
        return { isAuthenticated: false, errorMessage: loggedData.data };
    } else if (loggedData?.status === 401)
        return { isAuthenticated: false, errorMessage: loggedData.data };
    else
        return { isAuthenticated: false, errorMessage: "Problem with server connection" };
}

export const registerAsync = async (register: IRegister) => {
    const registrationData = await postData("User/register", register, false)

    if (registrationData?.status === 200) return { success: true }
    else if (registrationData?.status === 400) return { success: false, errorMessage: registrationData.data }

    return { success: false, errorMessage: "Problem with server connection" };
}

export const confirmAccount = async (register: IRegister, code: string) => {
    const confirmationData = await postData(`User/confirmAccount/${code}`, register)

    if (confirmationData?.status === 200) {
        const token = confirmationData?.data;

        modifyToken(token);
        const data = getDataFromToken();
        if (data !== null)
            return { isAuthenticated: true, username: data.username, firstname: data.firstname, lastname: data.lastname, email: data.email, role: data.role, pages: getMenuItems(data.role), token: token }
        return { isAuthenticated: false, errorMessage: confirmationData.data };
    }
    return { isAuthenticated: false, errorMessage: confirmationData?.data };
}

export const isAuthenticated = (): boolean => {
    return (getToken() !== null)
}