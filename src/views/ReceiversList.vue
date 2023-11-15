<template>
  <the-menu />
  <actions-bar />
  <receivers-table @open:modal="openModal" />
  <edit-modal :showEditModal="showModal" :data="modalData" @close:modal="closeModal" />
</template>

<script setup>
import { ref } from 'vue'
import TheMenu from '@/components/TheMenu/TheMenu.vue'
import ActionsBar from '@/components/ActionsBar/ActionsBar.vue'
import ReceiversTable from '@/components/ReceiversTable/ReceiversTable.vue'
import EditModal from '@/components/EditModal/EditModal.vue'

const showModal = ref(false)
const modalData = ref()

const openModal = (data) => {
  modalData.value = data
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>
