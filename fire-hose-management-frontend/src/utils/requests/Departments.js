import axios from "axios";

export const getAllDepartments = () => {
    return axios.get(process.env.REACT_APP_BACKEND_URL_DEPARTMENTS).then((response) => {
        return response.data;
    });
};

export const postDepartment = (departmentDto) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL_DEPARTMENTS, departmentDto).then((response) => {
        return response;
    });
};

export const deleteDepartment = (departmentId) => {
    return axios.delete(process.env.REACT_APP_BACKEND_URL_DEPARTMENTS_SPECIFIC + departmentId).then((response) => {
        return response;
    });
};

export const putDepartment = (departmentId, departmentDto) => {
    return axios
        .put(process.env.REACT_APP_BACKEND_URL_DEPARTMENTS_SPECIFIC + departmentId, departmentDto)
        .then((response) => {
            return response;
        });
};
