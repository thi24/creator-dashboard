<template>
  <div class="scrolling-page">
    <ScrollingComponent v-if="!loading">
      <slot/>
    </ScrollingComponent>
    <LoadingComponent :loading="loading"></LoadingComponent>
  </div>
</template>

<script setup lang="ts">
import ScrollingComponent from './ScrollingComponent.vue';
import LoadingComponent from './LoadingComponent.vue';

defineProps<{
  loading: boolean
}>();
</script>

<style scoped>
.scrolling-page {
  min-height: 100%;
  display: grid;
  grid-template-rows: 1fr;
}

@media screen and (max-width: 600px) {
  .scrolling-page {
    /*min-height: 79vh; -> Not working*/
  }
}
</style>