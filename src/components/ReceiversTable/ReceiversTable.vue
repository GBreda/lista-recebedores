<template>
  <div class="receivers-table">
    <button
      class="button-danger receivers-table__delete-button"
      :disabled="isDeleteButtonDisabled"
      @click="deleteReceivers"
    >
      Excluir selecionados
    </button>
    <table v-if="tableData.length">
      <tr>
        <th>Favorecido</th>
        <th>Chave Pix</th>
        <th>Banco</th>
        <th>Agência</th>
        <th>CC</th>
        <th>Status do favorecido</th>
      </tr>
      <tr
        class="table-row"
        v-for="(data, index) in tableData"
        :key="index"
        @click="openModal(data)"
      >
        <td>{{ data.name }}</td>
        <td>{{ formatPixKey(data) }}</td>
        <td>{{ data.bank_name || '-' }}</td>
        <td>{{ data.branch || '-' }}</td>
        <td>{{ data.account || '-' }}</td>
        <td><status-pill :status="data.status" /></td>
      </tr>
    </table>
    <p class="receivers-table__empty-table" v-else>Sua busca não obteve resultados.</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ReceiversService from '@/services/ReceiversService'
import useFormatDocuments from '@/composables/useFormatDocuments'
import StatusPill from '@/components/StatusPill/StatusPill.vue'
import { useSearchInputStore } from '@/stores/searchInputStore'
import { useToastStore } from '@/stores/toastStore'

const searchInputStore = useSearchInputStore()
const toastStore = useToastStore()

const emit = defineEmits(['open:modal', 'open:deleteModal'])

const { cpfMask, cnpjMask } = useFormatDocuments()

const tableData = ref([])
const isLoading = ref(false)
const isDeleteButtonDisabled = ref(true)

const searchInput = computed(() => searchInputStore.input)

const fetchTableData = async () => {
  isLoading.value = true

  try {
    // TODO: Pagination
    const payload = {
      page: 1,
      limit: 8,
      search: searchInput.value
    }

    const { data } = await ReceiversService.fetchReceivers(payload)

    tableData.value = data
  } catch {
    toastStore.setToastInfo({
      showToast: true,
      message: 'Erro inesperado, por favor tente novamente.',
      kind: 'danger'
    })
  } finally {
    isLoading.value = false
  }
}

fetchTableData()

watch(searchInput, () => {
  fetchTableData()
})

const formatPixKey = ({ pix_key, pix_key_type }) => {
  if (pix_key_type === 'cnpj') return cnpjMask(pix_key)
  if (pix_key_type === 'cpf') return cpfMask(pix_key)
  if (pix_key_type === 'aleatoria' || pix_key_type === 'email') return pix_key

  return '-'
}

const openModal = (data) => {
  emit('open:modal', data)
}

const deleteReceivers = (data) => {
  emit('open:deleteModal', data)
}
</script>

<style lang="scss" scoped>
.receivers-table {
  padding: 4rem 5rem;

  &__delete-button {
    margin-bottom: 4rem;
  }

  table {
    width: 100%;
    .table-row {
      cursor: pointer;
    }

    th {
      font-weight: 600;
      color: $darker-gray;
      padding: 1.6rem;
      font-size: 1.6rem;
      text-align: left;
    }

    td {
      padding: 1.6rem;
      font-size: 1.6rem;
      font-weight: 300;
    }
  }

  &__empty-table {
    font-size: 2.8rem;
    font-weight: 300;
    text-align: center;
    margin-top: 3rem;
  }
}
</style>
