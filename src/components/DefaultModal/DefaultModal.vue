<template>
  <div v-if="showModal" class="modal">
    <div class="modal--overlay">
      <div class="modal__container">
        <slot name="header">
          <div class="modal__container__header" data-test-id="header">
            <img
              src="@/assets/images/dark-close-icon.png"
              alt="Fechar modal"
              @click="closeModal"
              data-test-id="close-modal"
            />
          </div>
        </slot>
        <slot name="body" data-test-id="body" />

        <slot name="footer" data-test-id="footer">
          <div class="modal__container__footer">
            <button class="button-outline" @click="closeModal" data-test-id="back-button">
              Voltar
            </button>
            <div class="modal__container__footer__edit-actions">
              <button
                class="button-danger modal__container__footer__delete-button"
                @click="remove"
                data-test-id="remove-button"
              >
                <img src="@/assets/images/trash-icon.png" alt="Excluir recebedor" />
              </button>
              <button class="button-primary" @click="confirm" data-test-id="confirm-button">
                Salvar
              </button>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close:modal', 'update:confirm', 'update:remove'])

const closeModal = () => {
  emit('close:modal')
}

const confirm = () => {
  emit('update:confirm')
}

const remove = () => {
  emit('update:remove')
}
</script>

<style lang="scss" scoped>
.modal {
  &--overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($black, 0.2);
    backdrop-filter: blur(0.4rem);
  }

  &__container {
    width: 73rem;
    margin: 4rem auto;
    padding: 2.5rem 2.5rem 4rem 2.5rem;
    background-color: $white;
    border-radius: 0.2rem;
    box-shadow: 0 0.1rem 0.5rem 0 rgba($black, 0.1);

    &__header {
      display: flex;
      justify-content: flex-end;

      img {
        cursor: pointer;
      }
    }

    &__footer {
      margin-top: 3.5rem;
      display: flex;
      justify-content: space-between;

      &__edit-actions {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      &__delete-button {
        width: 6rem;
      }
    }
  }
}
</style>
