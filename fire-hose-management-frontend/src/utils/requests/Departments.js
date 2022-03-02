import axios from "axios";
import urlBuilder from "../urlBuilder";

export const getAllDepartments = () => {
    return axios.get(urlBuilder.departments()).then((response) => {
        return response.data
    })
}

export const deleteDepartment = (departmentId) => {
    return axios.delete(urlBuilder.departmentWithId(departmentId)).then((response) => {
        return response
    })
}

export const postDepartment = (departmentDto) => {
    return axios.post(urlBuilder.departments(), departmentDto).then((response) => {
        return response
    })
}

export const putDepartment = (departmentId, departmentDto) => {
    return axios.put(urlBuilder.departmentWithId(departmentId), departmentDto).then((response) => {
        return response
    })
}