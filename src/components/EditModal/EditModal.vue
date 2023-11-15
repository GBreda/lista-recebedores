<template>
  <default-modal :showModal="showEditModal" @close:modal="closeModal">
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
import DefaultModal from '../DefaultModal/DefaultModal.vue'
import StatusPill from '@/components/StatusPill/StatusPill.vue'
import ReceiverDataForm from '@/components/ReceiverDataForm/ReceiverDataForm.vue'
import PixKeyForm from '@/components/PixKeyForm/PixKeyForm.vue'

defineProps({
  showEditModal: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close:modal'])

let formPayload = reactive({})

const updateReceiverDataForm = (receiverDataForm) => {
  formPayload = { ...formPayload, ...receiverDataForm }
}

const updatePixKeyForm = (pixKeyForm) => {
  formPayload = { ...formPayload, ...pixKeyForm }
}

const closeModal = () => {
  emit('close:modal')
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
