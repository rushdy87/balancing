import { apiConfig } from './config';
import { postRequest } from './requist';

export const addNaturalGas = async (gasData) => {
  const response = await postRequest(`${apiConfig.baseURL}/u52/gas`, gasData);
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
