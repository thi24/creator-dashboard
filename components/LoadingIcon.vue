<template>
  <UiIcon class="rotate">progress_activity</UiIcon>
</template>

<script setup lang="ts">
import UiIcon from './ui/UiIcon.vue';

defineProps({
  fontSize: {
    type: String,
    default: "3rem"
  }
});
</script>

<style scoped>
.rotate {
  animation: rotate 1s linear infinite;
  font-size: v-bind(fontSize);
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>