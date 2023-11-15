<template>
  <default-modal :showModal="showDetailModal" @close:modal="closeModal">
    <template #body>
      <div class="content">
        <h2 class="content__title">{{ data.name }}</h2>

        <status-pill class="content__pill" :status="data.status" />

        <div class="content__fields">
          <div class="content__fields__field">
            <p class="content__fields__field--label">CPF/CNPJ</p>
            <p class="content__fields__field--value">{{ formatDocument(data.tax_id) }}</p>
          </div>

          <div class="content__fields__field">
            <p class="content__fields__field--label">Banco</p>
            <p class="content__fields__field--value">{{ data.bank_name }}</p>
          </div>

          <div class="content__fields__field">
            <p class="content__fields__field--label">Agência</p>
            <p class="content__fields__field--value">{{ data.branch }}</p>
          </div>

          <div class="content__fields__field">
            <p class="content__fields__field--label">Tipo de conta</p>
            <p class="content__fields__field--value">{{ data.account_type }}</p>
          </div>

          <div class="content__fields__field">
            <p class="content__fields__field--label">{{ data.account_type }}</p>
            <p class="content__fields__field--value">{{ data.account }}</p>
          </div>
        </div>

        <div class="content__email-input">
          <label for="email">E-mail do favorecido</label>
          <input type="text" id="email" v-model="email" @input="updateFormInputEmail" />
        </div>
      </div>
    </template>
  </default-modal>
</template>

<script setup>
import { ref } from 'vue'
import DefaultModal from '../DefaultModal/DefaultModal.vue'
import StatusPill from '@/components/StatusPill/StatusPill.vue'
import useFormatDocuments from '@/composables/useFormatDocuments'

defineProps({
  showDetailModal: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['close:modal'])

const { cpfMask, cnpjMask } = useFormatDocuments()

const CPF_LENGTH = 14

const email = ref('')

const closeModal = () => {
  emit('close:modal')
}

const formatDocument = (document) => {
  if (document.length > CPF_LENGTH) {
    return cnpjMask(document)
  }
  return cpfMask(document)
}

const updateFormInputEmail = () => {}
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

  &__pill {
    width: 22rem;
  }

  &__fields {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;

    &__field {
      &:first-child {
        width: 100%;
      }

      width: calc(50% - 3rem);

      &--label {
        font-weight: 300;
        font-size: 1.6rem;
        margin-bottom: 1.4rem;
      }

      &--value {
        font-weight: 300;
        font-size: 2.4rem;
      }
    }
  }

  &__email-input {
    width: 31.5rem;

    input {
      width: 100%;
    }
  }
}
</style>
