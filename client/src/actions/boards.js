import axios from "axios";

export const fetchBoards = () => {
  return axios.get("/api/boards");
};

export const fetchBoard = (id) => {
  return axios.get(`/api/boards/${id}`)
}

export const editBoard = (id, columns, boardName) => {
  return axios.put(`/api/boards/${id}`, { columns, boardName })
}

export const createBoard = (data) => {
  return axios.post("/api/boards", data)
}

export const deleteBoard = (id) => {
  return axios.delete(`/api/boards/${id}`)
}