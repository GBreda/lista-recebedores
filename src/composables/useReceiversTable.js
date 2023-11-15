import { computed } from 'vue'
import { useSearchInputStore } from '@/stores/searchInputStore'
import { useToastStore } from '@/stores/toastStore'
import { useReceiversTableStore } from '@/stores/receiversTableStore'

const useReceiversTable = () => {
  const searchInputStore = useSearchInputStore()
  const toastStore = useToastStore()
  const receiversTableStore = useReceiversTableStore()

  const searchInput = computed(() => searchInputStore.input)

  const fetchTableData = async () => {
    const payload = {
      page: 1,
      limit: 8,
      search: searchInput.value
    }

    try {
      await receiversTableStore.fetchTableData(payload)
    } catch {
      toastStore.setToastInfo({
        showToast: true,
        message: 'Erro inesperado, por favor tente novamente.',
        kind: 'danger'
      })
    }
  }

  return {
    fetchTableData
  }
}

export default useReceiversTable
