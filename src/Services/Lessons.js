import BaseUrl from "../component/BaseUrl";

export const get = async (search) => {
    try {
        const response = await BaseUrl.get(`/api/Lessons/GetLessons?dayNumber=${search}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const uploadFile = async (body) => {
    try {
        // debugger
        const response = await BaseUrl.post("/api/Lessons/UploadLessonFile" , body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const addLesson = async (body) => {
    try {
        const response = await BaseUrl.post("/api/Lessons/SaveLesson" , body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const getLessonbyId = async (id) => {
    try {
        const response = await BaseUrl.get(`/api/Lessons/GetLessonById/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}

export const updateLesson = async (body) => {
    try {
        const response = await BaseUrl.put(`/api/Lessons/UpdateLesson`,body);
        return response;
    } catch (err) {
        return err.response
    }
}

export const deleteLesson = async (id) => {
    try {
        const response = await BaseUrl.patch(`/api/Lessons/DeleteLesson/${id}`);
        return response;
    } catch (err) {
        return err.response
    }
}