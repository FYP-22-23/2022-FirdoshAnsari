import Axios from "axios";
import {API_SERVER} from "../config/constant";

export const axios = Axios.create({
    baseURL: `${API_SERVER}`,
    headers: {"Content-Type": "application/json"},
});

export const authAxios = Axios.create({
    baseURL: API_SERVER,
    validateStatus: ()=>true,
});

authAxios.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user')
        const accessToken = JSON.parse(user).token
        if (accessToken) {
            config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

axios.interceptors.request.use(
    (config) => {
        return Promise.resolve(config);
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
        return Promise.reject(error);
    }
);

export default axios
