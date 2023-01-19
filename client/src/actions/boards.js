import axios from "axios";

export const fetchBoards = () => {
  return axios.get("/api/boards");
};

export const fetchBoard = (id) => {
  return axios.get(`/api/boards/${id}`)
}