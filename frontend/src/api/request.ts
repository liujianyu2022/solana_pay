import axios, { AxiosResponse } from "axios";
import store from "../store/store";
import { AppAction } from "../types/ReducerTypes";
import { ResponseType } from "../types/ResponseType";

const request = axios.create({
    baseURL: "http://localhost:3005/",
    timeout: 100000
})

request.interceptors.request.use((config)=>{
    return config
}, (error)=>{
    return Promise.reject(error);
})

request.interceptors.response.use((response: AxiosResponse<ResponseType>)=>{
    return response
}, (error)=>{
    return Promise.reject(error);
})

export default request
