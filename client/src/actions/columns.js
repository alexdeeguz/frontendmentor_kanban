import axios from "axios";

export const fetchColumns = (boardId) => {
  return axios.get(`/api/columns/${boardId}`);
};
