import axios from "axios";
import urlBuilder from "../urlBuilder";

export const getAllDevices = () => {
  return axios.get(urlBuilder.devices()).then((response) => {
    return response.data;
  });
};

export const postDevice = (deviceDto) => {
  return axios.post(urlBuilder.devices(), deviceDto).then((response) => {
    return response;
  });
};

export const putDevice = (deviceId, deviceDto) => {
  return axios.put(urlBuilder.deviceWithId(deviceId), deviceDto).then((response) => {
    return response;
  });
};

export const deleteDevice = (deviceId) => {
  return axios.delete(urlBuilder.deviceWithId(deviceId)).then((response) => {
    return response;
  });
};
