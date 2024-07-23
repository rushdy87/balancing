import { apiConfig } from './config';
import { postRequest } from './requist';

export const addSolidSulphurStore = async (sulphurData) => {
  const response = await postRequest(
    `${apiConfig.baseURL}/u54/store`,
    sulphurData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
