import { apiConfig, postData } from '../api-config';

export const addTanksVolumes = async (tanksData) => {
  return await postData(`${apiConfig.baseURL}/u52/tanks`, tanksData);
};
