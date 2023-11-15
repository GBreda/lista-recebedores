<template>
  <div class="pix-key-form">
    <div class="pix-key-form__key-type">
      <label for="key_type">Tipo de chave</label>
      <select name="key_type" id="key_type" @change="updateKeyType" v-model="form.key_type">
        <option value="cnpj">CNPJ</option>
        <option value="cpf">CPF</option>
        <option value="aleatoria">Aleatória</option>
        <option value="email">E-mail</option>
      </select>
    </div>

    <div class="pix-key-form__key" style="margin-top: 2rem">
      <label for="key">Chave</label>
      <input type="text" id="key" @input="updateKey" v-model="form.key" :maxlength="CNPJ_LENGTH" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import useFormatDocuments from '@/composables/useFormatDocuments'

const emit = defineEmits(['update:pixKeyForm'])

const { cpfMask, cnpjMask } = useFormatDocuments()

const CPF_LENGTH = 14
const CNPJ_LENGTH = 18

const form = reactive({
  key_type: null,
  key: null
})

const updateKeyType = () => {
  emit('update:pixKeyForm', form)
}

const updateKey = () => {
  if (form.key.length > CPF_LENGTH) {
    form.key = cnpjMask(form.key)
  } else {
    form.key = cpfMask(form.key)
  }

  emit('update:pixKeyForm', form)
}
</script>

<style lang="scss" scoped>
.pix-key-form {
  margin-bottom: 8rem;

  select,
  input {
    width: 100%;
  }

  &__key-type,
  &__key {
    width: 35rem;
    margin-bottom: 2rem;
  }
}
</style>
