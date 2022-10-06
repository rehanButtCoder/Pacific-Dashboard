import BaseUrl from "../component/BaseUrl";

export const get = async (search) => {
    try {
        const response = await BaseUrl.get(`/api/Account/GetAllInHouseUsers?name=${search}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const getOnlineUsers = async (search) => {
    try {
        const response = await BaseUrl.get(`/api/Account/GetAllOnlineUsers?name=${search}`);
        return response;
    } catch (err) {
        return err.response
    }
}
// upload img

export const userImgUplod = async (body) => {
    try {
        const response = await BaseUrl.post(`/api/Account/UploadProfilePicture`, body);
        return response;
    } catch (err) {
        return err.response
    }
}
// createUsers
export const createInHouseUser = async (body) => {
    try {
        const response = await BaseUrl.post("/api/Account/CreateUser", body);
        return response;
    } catch (err) {
        return err.response
    }
}

// get single users

export const getSingleUser = async (id) => {
    try {
        const response = await BaseUrl.get(`/api/Account/GetUserById/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}

// update users

export const updateTheUser = async (body) => {
    try {
        const response = await BaseUrl.put("/api/Account/UpdateUser", body);
        return response;
    } catch (err) {
        return err.response
    }
}

//  delete


export const deleteTheUser = async (id) => {
    try {
        const response = await BaseUrl.delete(`/api/Account/DeleteUser/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}
