<template>
  <the-header />
  <the-toast v-if="toastInfo.showToast" :message="toastInfo.message" :kind="toastInfo.kind" />
  <router-view />
</template>

<script setup>
import { computed } from 'vue'
import { useToastStore } from '@/stores/toastStore'
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheToast from '@/components/TheToast/TheToast.vue'

const toastStore = useToastStore()

const toastInfo = computed(() => toastStore.toastInfo)
</script>
