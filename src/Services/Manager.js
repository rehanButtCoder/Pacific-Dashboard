import BaseUrl from "../component/BaseUrl";

export const getAllManager = async (search) => {
    try {
        const response = await BaseUrl.get(`/api/Users/GetCaseManagers?name=${search}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const saveManager = async (body) => {
    try {
        const response = await BaseUrl.post("/api/Users/SaveCaseManager" , body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const getManagerById = async (id) => {
    try {
        const response = await BaseUrl.get(`/api/Users/GetCaseManagerById/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const updateManager = async (body) => {
    try {
        const response = await BaseUrl.put("/api/Users/UpdateCaseManager" , body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const deleteManager = async (id) => {
    try {
        const response = await BaseUrl.patch(`/api/Users/DeleteCaseManager/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}

