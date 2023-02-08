import axios from "axios";

export const fetchColumns = (boardId) => {
  return axios.get(`/api/columns/${boardId}`);
};

export const createColumn = (data) => {
  return axios.post("/api/columns", data)
}

export const deleteColumn = (id) => {
  return axios.delete(`/api/columns/${id}`)
}
