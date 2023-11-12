import { defineStore } from 'pinia'

export const useSearchInputStore = defineStore('searchInputStore', {
  state: () => ({
    input: ''
  }),
  actions: {
    setSearchInputValue(value) {
      this.input = value
    }
  }
})
