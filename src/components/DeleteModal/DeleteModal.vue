<template>
  <default-modal :showModal="showDeleteModal" @close:modal="closeModal">
    <template #body>
      <div class="content">
        <h2 class="content__title">Excluir favorecido</h2>
        <p class="content__confirmation-text">{{ confirmationText }}</p>
        <p class="content__text">
          O Histórico de pagamentos para este favorecido será mantido, mas ele será removido da sua
          lista de favorecidos.
        </p>
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <button class="button-outline" @click="closeModal">Cancelar</button>
        <button class="button-danger" @click="confirm">Confirmar exclusão</button>
      </div>
    </template>
  </default-modal>
</template>

<script setup>
import { computed } from 'vue'
import DefaultModal from '../DefaultModal/DefaultModal.vue'
import ReceiversService from '@/services/ReceiversService'
import useReceiversTable from '@/composables/useReceiversTable'
import { useToastStore } from '@/stores/toastStore'

const toastStore = useToastStore()

const { fetchTableData } = useReceiversTable()

const props = defineProps({
  showDeleteModal: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['close:modal'])

const closeModal = () => {
  emit('close:modal')
}

const confirmationText = computed(() => {
  const value = props.data.value

  if (value.length > 1) {
    return `Você confirma a exclusão dos ${value.length} favorecidos?`
  } else {
    return `Você confirma a exclusão do favorecido ${value[0].name}?`
  }
})

const deleteMessage = computed(() => {
  const value = props.data.value

  if (value.length > 1) {
    return 'Favorecidos alterados com sucesso'
  } else {
    return 'Favorecido alterado com sucesso'
  }
})

const confirm = async () => {
  const idsToDelete = props.data.value.map((item) => item.id)

  const deleteRequests = idsToDelete.map(async (id) => await ReceiversService.deleteReceiver(id))

  try {
    await Promise.all(deleteRequests)
    closeModal()

    toastStore.setToastInfo({
      showToast: true,
      kind: 'success',
      message: deleteMessage.value
    })

    fetchTableData()
  } catch (error) {
    closeModal()

    toastStore.setToastInfo({
      showToast: true,
      kind: 'danger',
      message: 'Erro inesperado ao deletar favorecidos'
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  &__title {
    font-size: 2.2rem;
    margin-top: 1rem;
    margin-bottom: 4rem;
  }

  &__confirmation-text,
  &__text {
    font-size: 1.8rem;
  }

  &__text {
    font-weight: 300;
    margin-top: 2rem;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8rem;
}
</style>
