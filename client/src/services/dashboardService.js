import api from "./api";

export const getDashboard = async (experimentId) => {

    const response =
        await api.get(
            `/dashboard/${experimentId}`
        );

    return response.data.data;

};