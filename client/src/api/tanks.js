import { apiConfig } from './config';
import { getRequest, patchRequest, postRequest } from './requist';

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

export const updateTank = async (unit, tag_number, day, tankData) => {
  const response = await patchRequest(
    `${apiConfig.baseURL}/${unit}/tanks/tank/${tag_number}/${day}`,
    tankData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
