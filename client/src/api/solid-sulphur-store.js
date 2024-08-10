import { apiConfig } from './config';
import { patchRequest, postRequest } from './requist';

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

export const updateSolidSulphurStore = async (storeData) => {
  const response = await patchRequest(
    `${apiConfig.baseURL}/u54/store`,
    storeData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
