import ApiClient from './ApiClientService'

const ReceiversService = {
  fetchReceivers({ page, limit, search }) {
    return ApiClient.get(`/receivers?_page=${page}&_limit=${limit}&q=${search}&_order=asc`)
  },
  deleteReceiver(id) {
    return ApiClient.delete(`/receivers/${id}`)
  },
  addNewReceiver(payload) {
    return ApiClient.post('/receivers', payload)
  }
}

export default ReceiversService
