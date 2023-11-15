<template>
  <div class="the-toast" :class="kindClass">
    <p class="the-toast__message">{{ message }}</p>
    <img
      class="the-toast__close-icon"
      src="@/assets/images/blur-close-icon.png"
      alt="Fechar alerta"
      @click="closeToast"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useToastStore } from '@/stores/toastStore'

const toastStore = useToastStore()

const props = defineProps({
  kind: {
    type: String,
    validator(value) {
      return ['success', 'danger'].includes(value)
    },
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

const kindClass = computed(() => `the-toast__${props.kind}`)

const closeToast = () => {
  toastStore.setToastInfo({
    showToast: false
  })
}
</script>

<style lang="scss" soped>
.the-toast {
  min-width: 28rem;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-radius: 0.8rem;
  position: absolute;
  top: 5.2rem;
  right: 2rem;

  &__message {
    color: $white;
    font-weight: 500;
  }

  &__close-icon {
    cursor: pointer;
  }

  &__success {
    background-color: $blue;
  }

  &__danger {
    background-color: $red;
  }
}
</style>
