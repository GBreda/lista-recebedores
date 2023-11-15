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
        <th>
          <input type="checkbox" v-model="selectAll" @change="selectAllRows" />
        </th>
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
        @click="handleRowClick(data, $event)"
      >
        <td>
          <input type="checkbox" :checked="isSelected(data)" @change="handleRowSelection(data)" />
        </td>
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
import useFormatDocuments from '@/composables/useFormatDocuments'
import useReceiversTable from '@/composables/useReceiversTable'
import StatusPill from '@/components/StatusPill/StatusPill.vue'
import { useSearchInputStore } from '@/stores/searchInputStore'
import { useReceiversTableStore } from '@/stores/receiversTableStore'

const emit = defineEmits(['open:modal', 'open:deleteModal'])

const searchInputStore = useSearchInputStore()
const receiversTableStore = useReceiversTableStore()

const { cpfMask, cnpjMask } = useFormatDocuments()
const { fetchTableData } = useReceiversTable()

const selectAll = ref(false)
const selectedRows = ref([])

const searchInput = computed(() => searchInputStore.input)
const tableData = computed(() => receiversTableStore.tableData)

const isDeleteButtonDisabled = computed(() => !selectedRows.value.length)

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

const deleteReceivers = () => {
  emit('open:deleteModal', selectedRows)
}

const handleRowClick = (data, event) => {
  if (event.target.tagName.toLowerCase() !== 'input') {
    openModal(data)
  }
}

const isSelected = (data) => {
  return selectedRows.value.includes(data)
}

const selectAllRows = () => {
  selectedRows.value = selectAll.value ? [...tableData.value] : []
}

const handleRowSelection = (data) => {
  if (isSelected(data)) {
    selectedRows.value = selectedRows.value.filter((row) => row !== data)
  } else {
    selectedRows.value.push(data)
  }
  selectAll.value = selectedRows.value.length === tableData.value.length
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
