import { apiConfig } from './config';
import { postRequest } from './requist';

export const addTransport = async (unit, transportData) => {
  const response = await postRequest(
    `${apiConfig.baseURL}/${unit}/transport`,
    transportData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
