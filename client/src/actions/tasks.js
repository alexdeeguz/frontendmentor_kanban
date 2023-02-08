import axios from "axios"

export const fetchTasks = (columnId) => {
    return axios.get(`/api/tasks/${columnId}`)
}

export const updateTask = (id, task) => {
    return axios.put(`/api/tasks/${id}`, task)
}

export const createTask = (data) => {
    return axios.post("/api/tasks", data)
}