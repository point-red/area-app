<script setup lang="ts">
const props = defineProps<{
  email?: string
}>()
</script>

<template>
  <base-card class="max-w-xl">
    <div class="flex flex-col gap-6">
      <div>
        <base-icon icon="i-fal-envelope-circle-check" class="text-[48px] mb-2" />
        <h1>Your Email Has Been Verified!</h1>
      </div>
      <div>
        <p>
          Thank you for verifying your email address. Your account <b>"{{ props.email }}"</b> is now
          fully activated! You can now log in and access all the features of our platform.
        </p>
      </div>
    </div>
  </base-card>
</template>
