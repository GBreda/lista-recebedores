<template>
  <div class="receivers-table">
    <button
      class="button-danger receivers-table__delete-button"
      :disabled="isDeleteButtonDisabled"
    >
      Excluir selecionados
    </button>
    <table>
      <tr>
        <th>Favorecido</th>
        <th>CPF / CNPJ / Aleatória</th>
        <th>Banco</th>
        <th>Agência</th>
        <th>CC</th>
        <th>Status do favorecido</th>
      </tr>
      <tr v-for="(data, index) in tableData" :key="index">
        <td>
          <span>{{ data.name }}</span>
          <a class="receivers-table__link" v-if="data.status === 'rascunho'">( Clicável )</a>
        </td>
        <td>{{ formatDocument(data) }}</td>
        <td>{{ data.bank_name || '-'}}</td>
        <td>{{ data.branch || '-' }}</td>
        <td>{{ data.account || '-'}}</td>
        <td><status-pill :status="data.status"/></td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ReceiversService from '@/services/ReceiversService';
import useFormatDocuments from '@/composables/useFormatDocuments';
import StatusPill from '@/components/StatusPill/StatusPill.vue';

const { cpfMask, cnpjMask } = useFormatDocuments();

const tableData = ref([])
const isLoading = ref(false);
const isDeleteButtonDisabled = ref(true);

const fetchTableData = async () => {
  isLoading.value = true

  try {
    const payload = {
      page: 1,
      limit: 8
    }

    const { data } = await ReceiversService.fetchReceivers(payload)

    tableData.value = data
  } catch {
    console.log('error')
  } finally {
    isLoading.value = false
  }
}

fetchTableData()

const formatDocument = ({ pix_key, pix_key_type }) => {
  if (pix_key_type === 'cnpj') return cnpjMask(pix_key)
  if (pix_key_type === 'cpf') return cpfMask(pix_key)
  if (pix_key_type === 'aleatoria') return pix_key

  return '-'
}
</script>

<style lang="scss" scoped>
.receivers-table {
 padding: 4rem 5rem;

 &__delete-button {
  margin-bottom: 4rem;
 }

 &__link {
  margin-left: 0.5rem;
  font-weight: 600;
  cursor: pointer;
 }

 table {
  width: 100%;
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

</style>