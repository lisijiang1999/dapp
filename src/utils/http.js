import axios from 'axios'
const request = axios.create({
    baseURL:"http://localhost:8080"
})

request.interceptors.request.use(config => {
    return config
})

request.interceptors.response.use(config => {
    return res
})

export { request }