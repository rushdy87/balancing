import axios from 'axios';

export const getRequest = async (url) => {
  try {
    const response = await axios.get(url);
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