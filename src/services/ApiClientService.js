import axios from 'axios'

const ApiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default ApiClient
