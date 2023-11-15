<template>
  <the-menu />
  <actions-bar />
  <receivers-table @open:modal="openModal" />
  <edit-modal :showEditModal="showEditModal" :data="modalData" @close:modal="closeModal('edit')" />
  <detail-modal
    :showDetailModal="showDetailModal"
    :data="modalData"
    @close:modal="closeModal('detail')"
  />
</template>

<script setup>
import { ref } from 'vue'
import TheMenu from '@/components/TheMenu/TheMenu.vue'
import ActionsBar from '@/components/ActionsBar/ActionsBar.vue'
import ReceiversTable from '@/components/ReceiversTable/ReceiversTable.vue'
import EditModal from '@/components/EditModal/EditModal.vue'
import DetailModal from '@/components/DetailModal/DetailModal.vue'

const showEditModal = ref(false)
const showDetailModal = ref(false)

const modalData = ref()

const openModal = (data) => {
  modalData.value = data

  if (data.status === 'validado') {
    showDetailModal.value = true
  } else {
    showEditModal.value = true
  }
}

const closeModal = (type) => {
  if (type === 'edit') {
    showEditModal.value = false
  } else {
    showDetailModal.value = false
  }
}
</script>
