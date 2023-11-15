<template>
  <div class="receiver-data-form">
    <div class="receiver-data-form__name">
      <label for="name">Qual o nome completo ou razão social do favorecido?</label>
      <input type="text" id="name" v-model="form.name" @input="updateFormInputName" />
    </div>

    <div class="receiver-data-form__document">
      <label for="document">Qual o CPF ou CNPJ?</label>
      <input
        type="text"
        id="document"
        v-model="form.document"
        @input="updateFormInputDocument"
        :maxlength="CNPJ_LENGTH"
      />
    </div>

    <div class="receiver-data-form__email">
      <label for="email">Qual o e-mail para o envio do comprovante?</label>
      <input type="text" id="email" v-model="form.email" @input="updateFormInputEmail" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import useFormatDocuments from '@/composables/useFormatDocuments'

const emit = defineEmits(['update:receiverDataForm'])

const { cpfMask, cnpjMask } = useFormatDocuments()

const CPF_LENGTH = 14
const CNPJ_LENGTH = 18

const form = reactive({
  name: null,
  document: null,
  email: null
})

const updateFormInputName = () => {
  emit('update:receiverDataForm', form)
}

const updateFormInputDocument = () => {
  if (form.document.length > CPF_LENGTH) {
    form.document = cnpjMask(form.document)
  } else {
    form.document = cpfMask(form.document)
  }

  emit('update:receiverDataForm', form)
}

const updateFormInputEmail = () => {
  emit('update:receiverDataForm', form)
}
</script>

<style lang="scss" scoped>
.receiver-data-form {
  display: flex;
  flex-wrap: wrap;

  input {
    width: 100%;
  }

  &__name {
    margin-right: 4rem;
  }

  &__name,
  &__email {
    width: 35rem;
    margin-bottom: 4rem;
  }

  &__document {
    width: 17.5rem;
    margin-bottom: 4rem;
  }
}
</style>
