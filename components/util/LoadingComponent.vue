<template>
  <div class="center-center" v-if="loading">
    <LoadingIcon></LoadingIcon>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
}>();
</script>