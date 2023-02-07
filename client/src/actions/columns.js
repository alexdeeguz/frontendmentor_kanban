import axios from "axios";

export const fetchColumns = (boardId) => {
  return axios.get(`/api/columns/${boardId}`);
};

export const createColumn = (data) => {
  return axios.post("/api/columns", data)
}
