import axios from "axios";
import urlBuilder from "../urlBuilder";

export const postOrder = (orderDto) => {
  return axios.post(urlBuilder.postOrder(), orderDto).then((response) => {
    return response;
  });
};
