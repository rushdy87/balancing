import { apiConfig } from './config';
import { patchRequest, postRequest } from './requist';

export const addPomping = async (item, pompingData) => {
  const response = await postRequest(
    `${apiConfig.baseURL}/u90/pumping/${item}`,
    pompingData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};

export const updatePumping = async (product, pumpingData) => {
  const response = await patchRequest(
    `${apiConfig.baseURL}/u90/pumping/${product}`,
    pumpingData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
