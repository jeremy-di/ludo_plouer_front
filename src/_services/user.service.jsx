import Axios from "./caller.service"

let login = (credentials) => {
    return Axios.post('/users/login', credentials)
}

let register = (credentials) => {
    return Axios.post('/users/register', credentials)
}

let getAllUsers = () => {
    return Axios.get('/users/all')
}

let getOneUser = (id) => {
    return Axios.get(`/users/${id}`)
}

let getMe = () => {
    return Axios.get('/users/profil/me')
}

let updateUser = (id, payload) => {
    return Axios.put(`/users/${id}`, payload)
}

let updateMe = (credentials) => {
    return Axios.patch('/users/updateme', credentials)
}

let updateMyPassword = (credentials) => {
    return Axios.patch('/users/updatemypass', credentials)
}

let deleteUser = (id) => {
    return Axios.delete(`/users/${id}`)
}

let saveToken = (token => {
    localStorage.setItem('token', token)
})

let getToken = () => {
    return localStorage.getItem('token')
}

let logout = () => {
    localStorage.removeItem('token')
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}
let saveFirstName = (firstName) => {
    localStorage.setItem('firstName', firstName)
}

let getFirstName = () => {
    let firstName = localStorage.getItem('firstName')
    return firstName
}

export const userService = {
    login, register, getAllUsers, getOneUser, getMe, updateUser, updateMe, updateMyPassword, deleteUser, saveToken, getToken, logout, isLogged, saveFirstName, getFirstName
}