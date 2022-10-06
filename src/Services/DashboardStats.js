import BaseUrl from "../component/BaseUrl";

export const getDashboardStats = async () => {
    try {
        const response = await BaseUrl.get("/api/Dashboard/GetDashboardStats");
        return response;
    } catch (err) {
        return err.response
    }
}