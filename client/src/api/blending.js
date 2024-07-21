import { apiConfig } from './config';
import { postRequest } from './requist';

export const addBlending = async (blendingData) => {
  const response = await postRequest(
    `${apiConfig.baseURL}/u52/blending`,
    blendingData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
