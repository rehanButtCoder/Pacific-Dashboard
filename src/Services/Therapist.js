import BaseUrl from "../component/BaseUrl";

export const getAllTherapist = async (search) => {
    try {
        const response = await BaseUrl.get(`/api/Users/GetTherapists?name=${search}`);
        return response;
    } catch (err) {
        return err.response
    }
}


export const saveTherapist = async (body) => {
    try {
        const response = await BaseUrl.post("/api/Users/SaveTherapist" , body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const GetTherapistById = async (id) => {
    try {
        const response = await BaseUrl.get(`/api/Users/GetTherapistById/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const updateTherapist = async (body) => {
    try {
        const response = await BaseUrl.put("/api/Users/UpdateTherapist" , body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const deleteTherapist = async (id) => {
    try {
        const response = await BaseUrl.patch(`/api/Users/DeleteTherapist/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}
