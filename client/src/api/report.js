import { apiConfig } from './config';
import { getRequest } from './requist';

export const getReportByDate = async (date) => {
  const response = await getRequest(`${apiConfig.baseURL}/reports/${date}`);
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
