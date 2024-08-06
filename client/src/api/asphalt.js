import { apiConfig } from './config';
import { patchRequest } from './requist';

export const updateAsphaltTransport = async (transportData) => {
  const response = await patchRequest(
    `${apiConfig.baseURL}/u53/transport`,
    transportData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
