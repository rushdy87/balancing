import { apiConfig, postData } from '../api-config';

export const addOilVolumes = async (oilData) => {
  return await postData(`${apiConfig.baseURL}/u52/crude`, oilData);
};
