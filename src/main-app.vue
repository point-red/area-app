<script setup lang="ts">
import { useDarkMode, useScreenSize } from '@point-hub/papp'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

import { toastRef } from './toast'

const { setDarkMode } = useDarkMode()

/**
 * Track breakpoint on screen change
 */
useScreenSize()

/**
 * the onMounted lifecycle hook is used to perform actions
 * when a component has been mounted to the DOM
 */
onMounted(() => {
  /**
   * Set default darkmode to light
   */
  setDarkMode('light')
})
</script>

<template>
  <RouterView />
  <!-- Toast Notification Component -->
  <base-toast ref="toastRef" />
</template>

<style scoped></style>
