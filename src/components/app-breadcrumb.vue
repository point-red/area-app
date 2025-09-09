<script setup lang="ts">
export interface IBreadcrumb {
  name: string
  path?: string
}

interface IProps {
  breadcrumbs: IBreadcrumb[]
}

const props = defineProps<IProps>()
</script>

<template>
  <base-card class="py-3!">
    <base-breadcrumb :items="props.breadcrumbs" separator="angle" v-slot="{ item }">
      <router-link v-if="item.path" :to="item.path">
        <base-icon v-if="item.path === '/'" icon="i-fas-house" class="-mt-1" />
        <span v-else>{{ item.name }}</span>
      </router-link>
      <div v-else>
        <span>{{ item.name }}</span>
      </div>
    </base-breadcrumb>
  </base-card>
</template>

<style scoped lang="postcss"></style>
