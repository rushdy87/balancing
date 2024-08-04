import { apiConfig } from './config';
import { patchRequest, postRequest } from './requist';

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

export const addLightTransport = async (item, transportData) => {
  const response = await postRequest(
    `${apiConfig.baseURL}/u90/transport/${item}`,
    transportData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};

export const updateLightTransport = async (product, transportData) => {
  const response = await patchRequest(
    `${apiConfig.baseURL}/u90/transport/${product}`,
    transportData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
