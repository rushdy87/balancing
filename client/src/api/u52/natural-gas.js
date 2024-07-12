import axios from 'axios';

import { apiConfig } from '../api-config';

export const adddNaturalGasVolumes = async (gasData) => {
  try {
    const response = await axios.post(`${apiConfig.baseURL}/u52/gas`, gasData);
    return response.data;
  } catch (error) {
    // Check if the error is an Axios error with a response object
    if (error.response) {
      // Response was received but it's not 2xx
      // throw new Error(
      //   `Error: ${error.response.status} - ${error.response.data.message}`
      // );
      console.log(
        `Error: ${error.response.status} - ${error.response.data.message}`
      );
    } else {
      // No response was received or an error occurred during the request setup
      throw new Error('Network Error');
    }
  }
};
