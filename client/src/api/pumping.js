import { apiConfig } from './config';
import { postRequest } from './requist';

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
