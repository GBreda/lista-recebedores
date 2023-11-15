<template>
  <default-modal
    :showModal="showEditModal"
    @close:modal="closeModal"
    @update:confirm="editReceiver"
    @update:remove="removeReceiver"
  >
    <template #body>
      <div class="content">
        <h2 class="content__title">{{ data.name }}</h2>

        <status-pill class="content__pill" :status="data.status" />

        <h2 class="content__form-title">Quais os dados do favorecido?</h2>

        <receiver-data-form @update:receiverDataForm="updateReceiverDataForm" />

        <h2 class="content__form-title">Quais os dados bancários do favorecido?</h2>

        <pix-key-form @update:pixKeyForm="updatePixKeyForm" />
      </div>
    </template>
  </default-modal>
</template>

<script setup>
import { reactive } from 'vue'
import { useToastStore } from '@/stores/toastStore'
import ReceiversService from '@/services/ReceiversService'
import useReceiversTable from '@/composables/useReceiversTable'
import DefaultModal from '../DefaultModal/DefaultModal.vue'
import StatusPill from '@/components/StatusPill/StatusPill.vue'
import ReceiverDataForm from '@/components/ReceiverDataForm/ReceiverDataForm.vue'
import PixKeyForm from '@/components/PixKeyForm/PixKeyForm.vue'

const toastStore = useToastStore()

const { fetchTableData } = useReceiversTable()

const props = defineProps({
  showEditModal: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['close:modal', 'open:deleteModal'])

let formPayload = reactive({})

const updateReceiverDataForm = (receiverDataForm) => {
  formPayload = { ...props.data, ...formPayload, ...receiverDataForm }
}

const updatePixKeyForm = (pixKeyForm) => {
  formPayload = { ...props.data, ...formPayload, ...pixKeyForm }
}

const closeModal = () => {
  emit('close:modal')
}

const editReceiver = async () => {
  try {
    await ReceiversService.updateNewReceiver(formPayload, props.data.id)

    toastStore.setToastInfo({
      showToast: true,
      message: 'Favorecido alterado com sucesso!',
      kind: 'success'
    })

    closeModal()

    fetchTableData()
  } catch {
    toastStore.setToastInfo({
      showToast: true,
      message: 'Erro inesperado ao adicionar favorecidos',
      kind: 'danger'
    })

    closeModal()
  }
}

const removeReceiver = () => {
  closeModal()

  emit('open:deleteModal', [props.data])
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;

  &__title {
    font-size: 2.2rem;
    margin-top: 1rem;
  }

  &__form-title {
    font-size: 2.8rem;
    font-weight: 300;
  }

  &__pill {
    width: 22rem;
  }
}
</style>
