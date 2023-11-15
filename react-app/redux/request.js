import axios from 'axios'

const instance = axios.create({
  timeout: 10000,
  headers: {},
})
instance.interceptors.response.use(response => {
  return response
}, error => {
  console.log('API general error handling', error)
  return Promise.reject(error)
})

export default instance