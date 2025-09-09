<script setup lang="ts">
const props = defineProps<{
  email: string
}>()
</script>

<template>
  <base-card class="max-w-xl">
    <div class="flex flex-col gap-6">
      <div>
        <base-icon icon="i-fal-envelope-circle-check" class="text-[48px] mb-2" />
        <h1>Request Password Success</h1>
      </div>

      <div>
        <p>We have sent instructions to reset your password to your email</p>
        <p class="font-semibold">{{ props.email }}</p>
      </div>
    </div>
  </base-card>
</template>
