import { apiConfig } from './config';
import { getRequest, postRequest } from './requist';

export const getTanksByUnit = async (unit) => {
  const response = await getRequest(`${apiConfig.baseURL}/tanks-info/${unit}`);
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};

export const addTanks = async (unit, tanksData) => {
  const response = await postRequest(
    `${apiConfig.baseURL}/${unit}/tanks`,
    tanksData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
