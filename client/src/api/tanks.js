import { apiConfig } from './config';
import { getRequest } from './requist';

export const getTanksByUnit = async (unit) => {
  const response = await getRequest(`${apiConfig.baseURL}/tanks-info/${unit}`);
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
