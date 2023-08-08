import jwtDecode, { JwtPayload } from "jwt-decode"
import { Role } from "../Types"

interface IJwtPayload extends JwtPayload {
    username: string,
    roleName: string,
    role: Role,
    email: string
}

const tokenVariableName = "token";

export const getToken = (): string | null => {
    return localStorage.getItem(tokenVariableName)
}

export const removeToken = () => {
    localStorage.removeItem(tokenVariableName)
}

export const modifyToken = (token: string) => {
    localStorage.setItem(tokenVariableName, token)
}

export const getDataFromToken = () => {
    const token = getToken();
    if (token === null) return null;
    const jwt: IJwtPayload = jwtDecode(token);
    jwt.role = Role[jwt.roleName as keyof typeof Role];

    // chacking expiration date
    const exp = new Date(jwt.exp! * 1000);
    if (exp < new Date()) {
        removeToken()
        return null;
    }
    return jwt;
}