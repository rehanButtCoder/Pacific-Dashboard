import BaseUrl from "../component/BaseUrl";

export const getPayments = async (search) => {
    try {
        const response = await BaseUrl.get(`/api/Users/GetUserPaymentList?transactionNumber=${search}`);
        return response;
    } catch (err) {
        return err.response
    }
}