import Axios from "./caller.service"

let createActivity = (credentials) => {
    return Axios.post('/activities/new', credentials)
}

let getAllActivities = () => {
    return Axios.get('/activities/all')
}

let getOneActivity = (id) => {
    return Axios.get(`/activities/${id}`)
}

let updateActivity = (id, payload) => {
    return Axios.put(`/activities/${id}`, payload)
}

let archiveActivities = () => {
    return Axios.post('/activities/archive')
}

export const activityService = {
    createActivity, getAllActivities, getOneActivity, updateActivity, archiveActivities
}