import axios from "axios";

const baseURL = 'https://api.lojasnalin.com.br:4000';

const api = axios.create({
    baseURL,
})


export  default api