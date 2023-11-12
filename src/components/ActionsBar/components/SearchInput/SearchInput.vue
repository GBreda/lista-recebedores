<template>
  <div class="search">
    <input
      :value="inputValue"
      @input="updateInput"
      class="search__input"
      type="text"
      placeholder="Nome, CPF, agência ou conta"
      data-test-id="search-input"
    />
    <img src="@/assets/images/search-icon.png" class="search__icon" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSearchInputStore } from '@/stores/searchInputStore'

const searchInputStore = useSearchInputStore()

const inputValue = ref('')

const updateInput = (event) => {
  searchInputStore.setSearchInputValue(event.target.value)
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  display: flex;
  align-items: center;

  &__input {
    width: 25rem;
  }

  &__icon {
    position: absolute;
    width: 1.6rem;
    right: 1rem;
  }
}
</style>
