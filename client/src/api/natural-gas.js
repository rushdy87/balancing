import { apiConfig } from './config';
import { patchRequest, postRequest } from './requist';

export const addNaturalGas = async (gasData) => {
  const response = await postRequest(`${apiConfig.baseURL}/u52/gas`, gasData);
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};

export const updateNaturalGas = async (naturalGasData) => {
  const response = await patchRequest(
    `${apiConfig.baseURL}/u52/gas`,
    naturalGasData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
