import api from "./api";

export const startExperiment = async (experimentId) => {
  const response = await api.put(
    `/experiments/${experimentId}/start`
  );

  return response.data.data;
};

export const submitExperiment = async (
  experimentId,
  submittedCode
) => {
  const response = await api.put(
    `/experiments/${experimentId}/submit`,
    {
      submittedCode,
    }
  );

  return response.data.data;
};