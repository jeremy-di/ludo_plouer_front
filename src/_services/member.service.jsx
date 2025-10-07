import Axios from "./caller.service"

let createMember = (credentials) => {
    return Axios.post('/members/new', credentials)
}

let getAllMembers = () => {
    return Axios.get('/members/all')
}

let getOneMember = (id) => {
    return Axios.get(`/members/${id}`)
}

let updateMember = (id, payload) => {
    return Axios.put(`/members/${id}`, payload)
}

let deleteMember = (id) => {
    return Axios.delete(`/members/${id}`)
}

export const memberService = {
    createMember, getAllMembers, getOneMember, updateMember, deleteMember
}