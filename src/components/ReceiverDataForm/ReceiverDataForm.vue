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
        v-model="form.tax_id"
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
  tax_id: null,
  email: null
})

const updateFormInputName = () => {
  emit('update:receiverDataForm', form)
}

const updateFormInputDocument = () => {
  if (form.tax_id.length > CPF_LENGTH) {
    form.tax_id = cnpjMask(form.tax_id)
  } else {
    form.tax_id = cpfMask(form.tax_id)
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
