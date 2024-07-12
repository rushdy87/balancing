import axios from 'axios';

export const apiConfig = {
  baseURL: 'http://localhost:3030/api',
};

export const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        error: `Error: ${error.response.status} - ${error.response.data.message}`,
      };
    } else {
      return { error: 'Network Error' };
    }
  }
};
