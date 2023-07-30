import axios from "axios";


export const getData = async (endpoint: string | undefined, authorisationRequired: boolean = false) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}${endpoint}`, {
            headers: authorisationRequired ? {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            } : {}
        })
        return { status: response.status, data: response.data }
    } catch (error) {
        console.log(error);
    }
}