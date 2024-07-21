import { apiConfig } from './config';
import { postRequest } from './requist';

export const addCrudeOil = async (croudeData) => {
  const response = await postRequest(
    `${apiConfig.baseURL}/u52/crude`,
    croudeData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
