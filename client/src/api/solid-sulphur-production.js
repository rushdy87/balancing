import { apiConfig } from './config';
import { postRequest } from './requist';

export const addSolidSulphurProduct = async (sulphurData) => {
  const response = await postRequest(
    `${apiConfig.baseURL}/u54/production`,
    sulphurData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
