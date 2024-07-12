import { apiConfig, postData } from '../api-config';

export const addNaturalGasVolumes = async (gasData) => {
  return await postData(`${apiConfig.baseURL}/u52/gas`, gasData);
};
