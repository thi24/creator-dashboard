<template>
  <div class="loading-content">
    <div v-if="!loading">
      <slot/>
    </div>
    <LoadingComponent v-if="loading" :loading="loading"></LoadingComponent>
  </div>
</template>

<script setup lang="ts">
import LoadingComponent from './LoadingComponent.vue';

defineProps<{
  loading: boolean
}>();
</script>

<style scoped>
.loading-content {
  display: grid;
  grid-template-rows: 1fr;
  height: 100%;
}
</style>