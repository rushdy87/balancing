import { apiConfig } from './config';
import { patchRequest, postRequest } from './requist';

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

export const updateCrudeOil = async (crudeOilData) => {
  const response = await patchRequest(
    `${apiConfig.baseURL}/u52/crude`,
    crudeOilData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
