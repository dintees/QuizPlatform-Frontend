import { toast } from "react-toastify";
import { deleteData, postData } from "../AxiosHelper";

export const duplicateTest = async (testId: number) => {
    const result = await postData(`set/duplicate/${testId}`, {}, true);
    if (result?.status === 200) {
        toast.success("Successfully duplicated test")
        return result.data.value
    } else if (result?.status === 400) {
        toast.error(result?.data.errorMessage)
        return -1
    } else {
        toast.error("Internal server error.")
        return -1
    }
}

export const deleteTest = async (setId: number) => {
    const result = await deleteData(`set/delete/${setId}`, true);
    if (result?.status === 200) {
        toast.success("Successfully deleted");
        return true;
    } else {
        toast.error(result?.data.errorMessage);
    }
    return false;
}