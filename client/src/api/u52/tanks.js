import axios from 'axios';

import { apiConfig } from '../api-config';

const data = {
  day: '04-06-2024',
  tanks: {
    'TK-52-401A': 2220,
    'TK-52-401B': 2220,
    'TK-52-401C': 2220,
    'TK-52-402A': 3000,
    'TK-52-402B': 4000,
    'TK-52-402C': 5000,
    'TK-52-403A': 5000,
    'TK-52-403B': 5000,
    'TK-52-403C': 5000,
    'TK-52-404A': 5000,
    'TK-52-404B': 5000,
    'TK-52-404C': 5000,
    'TK-52-405A': 5000,
    'TK-52-405B': 5000,
    'TK-52-405C': 5000,
    'TK-52-406A': 5000,
    'TK-52-406B': 5000,
    'TK-52-408A': 5000,
    'TK-52-408B': 5000,
    'TK-52-408C': 5000,
    'TK-52-409A': 5000,
    'TK-52-409B': 5000,
    'TK-52-409C': 5000,
    'TK-52-409D': 5000,
  },
};

export const addTanksVolume = async (tanksData = data) => {
  try {
    const response = await axios.post(
      `${apiConfig.baseURL}/u52/tanks`,
      tanksData
    );
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
