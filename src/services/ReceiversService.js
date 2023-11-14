import ApiClient from './ApiClientService'

const ReceiversService = {
  fetchReceivers({ page, limit }) {
    return ApiClient.get(`/receivers?_page=${page}&_limit=${limit}`)
  }
}

export default ReceiversService
