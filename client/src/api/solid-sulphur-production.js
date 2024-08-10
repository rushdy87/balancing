import { apiConfig } from './config';
import { patchRequest, postRequest } from './requist';

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

export const updateSolidSulphurProduct = async (productionData) => {
  const response = await patchRequest(
    `${apiConfig.baseURL}/u54/production`,
    productionData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
