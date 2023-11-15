<template>
  <div>
    <div class="close-bar">
      <img
        class="close-bar__icon"
        src="@/assets/images/close-icon.png"
        alt="Fechar adição de recebedores"
        @click="backToReceiversList"
      />
    </div>

    <div class="add-new-receiver-form">
      <h2 class="add-new-receiver-form__title">Quais os dados do favorecido?</h2>

      <receiver-data-form @update:receiverDataForm="updateReceiverDataForm" />

      <h2 class="add-new-receiver-form__title">Qual a chave pix?</h2>

      <pix-key-form @update:pixKeyForm="updatePixKeyForm" />

      <div class="add-new-receiver-form__actions">
        <button class="button-outline" @click="backToReceiversList">Cancelar</button>
        <button class="button-primary" @click="saveNewReceiver">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import ReceiversService from '@/services/ReceiversService'
import { useToastStore } from '@/stores/toastStore'
import ReceiverDataForm from '@/components/ReceiverDataForm/ReceiverDataForm.vue'
import PixKeyForm from '@/components/PixKeyForm/PixKeyForm.vue'

const router = useRouter()

const toastStore = useToastStore()

let formPayload = reactive({})

const backToReceiversList = () => {
  router.push({ name: 'receivers-list' })
}

const updateReceiverDataForm = (receiverDataForm) => {
  formPayload = { ...formPayload, ...receiverDataForm }
}

const updatePixKeyForm = (pixKeyForm) => {
  formPayload = { ...formPayload, ...pixKeyForm }
}

const saveNewReceiver = async () => {
  try {
    await ReceiversService.addNewReceiver(formPayload)

    toastStore.setToastInfo({
      showToast: true,
      message: 'Favorecido adicionado com sucesso!',
      kind: 'success'
    })

    backToReceiversList()
  } catch {
    toastStore.setToastInfo({
      showToast: true,
      message: 'Erro inesperado ao adicionar favorecidos',
      kind: 'danger'
    })
  }
}
</script>

<style lang="scss" scoped>
.close-bar {
  background-color: $green;
  display: flex;
  justify-content: flex-end;
  padding: 1.45rem 1rem;
  cursor: pointer;

  &__icon {
    width: 2.1rem;
  }
}

.add-new-receiver-form {
  max-width: 65rem;
  margin: 7.45rem auto;
  padding: 0 1rem;

  &__title {
    font-size: 2.8rem;
    font-weight: 300;
    margin-bottom: 5rem;
  }

  &__actions {
    margin-top: 8rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
