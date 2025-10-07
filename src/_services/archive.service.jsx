import Axios from "./caller.service"

let getAllArchives = () => {
    return Axios.get('/archives/all')
}

let getOneArchive = (id) => {
    return Axios.get(`/archives/${id}`)
}

export const archiveService = {
    getAllArchives, getOneArchive
}