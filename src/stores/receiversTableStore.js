import { defineStore } from 'pinia'
import ReceiversService from '@/services/ReceiversService'

export const useReceiversTableStore = defineStore('receiversTableStore', {
  state: () => ({
    tableData: []
  }),
  actions: {
    async fetchTableData(payload) {
      try {
        const { data } = await ReceiversService.fetchReceivers(payload)

        this.tableData = data

        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
