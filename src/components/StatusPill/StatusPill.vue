<template>
  <div class="status-pill" :class="statusList.classColor">
    <p class="status-pill--text">{{ statusList.label }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const statusList = computed(() => {
  if (props.status === 'rascunho') {
    return  {
      label: 'Rascunho',
      classColor: 'status-pill-draft'
    }
  }

  return {
    label: 'Validado',
    classColor: 'status-pill-validated'
  }
})
</script>

<style lang="scss" scoped>
.status-pill {
  width: 100%;
  border-radius: 2rem;
  padding: 0.7rem;

  &--text {
    text-align: center;
    color: $white;
    font-size: 1.4rem;
  }

  &-draft {
    background-color: $darken-gray;
  }

  &-validated {
    background-color: $blue;

  }
}

</style>