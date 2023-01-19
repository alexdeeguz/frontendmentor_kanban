import axios from "axios"

export const fetchTasks = (columnId) => {
    return axios.get(`/api/tasks/${columnId}`)
}