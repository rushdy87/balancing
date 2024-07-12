import { apiConfig, postData } from '../api-config';

export const addBlendingVolumes = async (blendingData) => {
  return await postData(`${apiConfig.baseURL}/u52/blending`, blendingData);
};
