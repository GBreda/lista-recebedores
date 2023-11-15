<template>
  <div class="add-new-receiver" data-test-id="add-new-receiver" @click="addNewReceiver">
    <span class="add-new-receiver__text">Seus favorecidos</span>
    <img class="add-new-receiver__icon" src="@/assets/images/cross-icon.png" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const addNewReceiver = () => {
  router.push({ name: 'add-new-receiver' })
}
</script>

<style lang="scss" scoped>
.add-new-receiver {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &__text {
    font-weight: 300;
    font-size: 2.8rem;
  }

  &__icon {
    padding: 1rem;
    border-radius: 50%;
    background-color: $green;
    margin-left: 1rem;
  }
}
</style>
