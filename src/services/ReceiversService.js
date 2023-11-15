import ApiClient from './ApiClientService'

const ReceiversService = {
  fetchReceivers({ page, limit, search }) {
    return ApiClient.get(`/receivers?_page=${page}&_limit=${limit}&q=${search}`)
  }
}

export default ReceiversService
