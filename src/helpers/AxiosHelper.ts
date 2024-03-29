import axios, { AxiosError } from "axios";
import { getToken } from "../utils/authUtils";


export const getData = async (endpoint: string | undefined, authorisationRequired: boolean = false) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
            headers: authorisationRequired ? {
                Authorization: `Bearer ${getToken()}`
            } : {}
        })
        return { status: response.status, data: response.data }
    } catch (error) {
        if (error instanceof AxiosError) {
            return { status: error.response?.status, data: error.response?.data }
        }
        console.log(error);
    }
}

export const postData = async (endpoint: string | undefined, body: any, authorisationRequired: boolean = false) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, body, {
            headers: authorisationRequired ? {
                Authorization: `Bearer ${getToken()}`
            } : {}
        })
        return { status: response.status, data: response.data }
    } catch (error) {
        if (error instanceof AxiosError) {
            return { status: error.response?.status, data: error.response?.data }
        }
        console.log(error);
    }
}

export const putData = async (endpoint: string | undefined, body: any, authorisationRequired: boolean = false) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, body, {
            headers: authorisationRequired ? {
                Authorization: `Bearer ${getToken()}`
            } : {}
        })
        return { status: response.status, data: response.data }
    } catch (error) {
        if (error instanceof AxiosError) {
            return { status: error.response?.status, data: error.response?.data }
        }
        console.log(error);
    }
}

export const deleteData = async (endpoint: string | undefined, authorisationRequired: boolean = false) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
            headers: authorisationRequired ? {
                Authorization: `Bearer ${getToken()}`
            } : {}
        })
        return { status: response.status, data: response.data }
    } catch (error) {
        if (error instanceof AxiosError) {
            return { status: error.response?.status, data: error.response?.data }
        }
        console.log(error);
    }
}