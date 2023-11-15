<template>
  <default-modal :showModal="showDeleteModal" @close:modal="closeModal">
    <template #body>
      <div class="content">
        <h2 class="content__title">Excluir favorecido</h2>
        <p class="content__confirmation-text">Você confirma a exclusão do favorecido {{ data }}?</p>
        <p class="content__text">
          O Histórico de pagamentos para este favorecido será mantido, mas ele será removido da sua
          lista de favorecidos.
        </p>
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <button class="button-outline">Cancelar</button>
        <button class="button-danger">Confirmar exclusão</button>
      </div>
    </template>
  </default-modal>
</template>

<script setup>
import DefaultModal from '../DefaultModal/DefaultModal.vue'

defineProps({
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
