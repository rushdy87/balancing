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
  // console.log(tanksdata);
  try {
    const url = `http://localhost:3030/api/${unit}/tanks/`;
    const { data } = await axios.post(
      url,
      { ...tanksdata }
      // {
      //   headers: { authorization: `Bearer ${token}` },
      // }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addBlending = async (blendingData) => {
  try {
    const url = 'http://localhost:3030/api/u52/blending/';
    const { data } = await axios.post(
      url,
      { ...blendingData }
      // {
      //   headers: { authorization: `Bearer ${token}` },
      // }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getReportDataByDay = async (day) => {
  try {
    const response = await axios.get(
      `http://localhost:3030/api/all/report/${day}`
    );
    return response.data.tanksReport;
  } catch (error) {
    // Check if the error is an Axios error with a response object
    if (error.response) {
      // Response was received but it's not 2xx
      console.log(
        new Error(
          `Error: ${error.response.status} - ${error.response.data.message}`
        )
      );
      return [];
    } else {
      // No response was received or an error occurred during the request setup
      console.log(new Error('Error: Network Error'));
      return [];
    }
  }
};
