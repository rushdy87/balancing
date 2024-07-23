import { apiConfig } from './config';
import { postRequest } from './requist';

export const login = async (userData) => {
  const response = await postRequest(
    `${apiConfig.baseURL}/auth/login`,
    userData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
