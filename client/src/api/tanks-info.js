import axios from 'axios';
import { apiConfig } from './api-config.js';

export const fetchTanksInfo = async () => {
  try {
    const response = await axios.get(`${apiConfig.baseURL}/tanks-info`);
    return response.data;
  } catch (error) {
    // Check if the error is an Axios error with a response object
    if (error.response) {
      // Response was received but it's not 2xx
      throw new Error(
        `Error: ${error.response.status} - ${error.response.data.message}`
      );
    } else {
      // No response was received or an error occurred during the request setup
      throw new Error('Network Error');
    }
  }
};
