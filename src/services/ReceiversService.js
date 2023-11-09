import ApiClient from './ApiClientService'

const ReceiversService = {
  fetchReceivers() {
    return ApiClient.get('/receivers')
  }
}

export default ReceiversService
