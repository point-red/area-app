<script setup lang="ts">
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardEmail from './card-email.vue'
import CardForm from './card-form.vue'
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />
    <card-form />
    <card-email />
  </div>
</template>
