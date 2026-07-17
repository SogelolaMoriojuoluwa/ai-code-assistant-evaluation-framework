import api from "./api";

export const registerParticipant = async (data) => {
  const response = await api.post("/participants", data);

  return response.data.data;
};