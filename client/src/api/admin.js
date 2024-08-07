import { apiConfig } from './config';
import { getRequest, patchRequest, postRequest } from './requist';

export const getAllUnitData = async (unit, day) => {
  const response = await getRequest(
    `${apiConfig.baseURL}/${unit}/admin/all/${day}`
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};

export const confirmeTank = async (unit, day, tag_number) => {
  const response = await patchRequest(
    `${apiConfig.baseURL}/${unit}/admin/confirm-tank`,
    { day, tag_number }
  );

  if (response.error) {
    console.log(response.error);
    return false;
  }
  return true;
};

export const confirmCrudeOil = async (day) => {
  const response = await patchRequest(
    `${apiConfig.baseURL}/u52/admin/confirm-crude`,
    { day }
  );

  if (response.error) {
    console.log(response.error);
    return false;
  }
  return true;
};

export const addNotes = async (unit, notesData) => {
  const response = await postRequest(
    `${apiConfig.baseURL}/${unit}/notes/all`,
    notesData
  );
  if (response.error) {
    console.log(response.error);
  } else {
    return response;
  }
};
