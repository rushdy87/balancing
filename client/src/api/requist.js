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

export const postRequest = async (url, data) => {
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

export const patchRequest = async (url, data) => {
  try {
    const response = await axios.patch(url, data);
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

export const deleteRequest = async (url) => {
  try {
    await axios.delete(url);
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
