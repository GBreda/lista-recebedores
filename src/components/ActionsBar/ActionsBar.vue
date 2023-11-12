<template>
  <div class="actions-bar">
    <add-new-receiver />
    <search-input />
  </div>
</template>

<script setup>
import AddNewReceiver from './components/AddNewReceiver/AddNewReceiver.vue'
import SearchInput from './components/SearchInput/SearchInput.vue'
</script>

<style lang="scss" scoped>
.actions-bar {
  padding: 4rem 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba($gray, 0.2);
}

@media only screen and (max-width: 768px) {
  .actions-bar {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
