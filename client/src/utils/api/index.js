import axios from 'axios';

export const fetchTanksInfo = async () => {
  try {
    const response = await axios.get('http://localhost:3030/api/tanks-info');
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

export const updateAllTanksInfo = async (newTanksInfo) => {
  try {
    const url = 'http://localhost:3030/api/tanks-info';
    const { data } = await axios.patch(
      url,
      { ...newTanksInfo }
      // {
      //   headers: { authorization: `Bearer ${token}` },
      // }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// http://localhost:3030/api/u52/tanks
// }
// "day": "08-06-2024",
//     "tanks": {
//     "TK-52-401A": 2220,
//      ....
//      }
// }
export const addVolumeToTanks = async (unit, tanksdata) => {
  try {
    const url = `http://localhost:3030/api/${unit}/tanks`;
    const { data } = await axios.post(
      url,
      { ...tanksdata }
      // {
      //   headers: { authorization: `Bearer ${token}` },
      // }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
