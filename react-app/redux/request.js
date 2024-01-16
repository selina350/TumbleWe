import axios from 'axios'

const instance = axios.create({
  timeout: 10000,
  headers: {},
})
instance.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default instance
