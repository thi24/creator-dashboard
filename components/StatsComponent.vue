<template>
    <div class="tile stats-component">
        <div v-if="label && value">
            <p>{{ label }}</p>
            <h2>{{ value }}</h2>
        </div>
        <LoadingComponent class="loading-component" :loading="!label || !value"></LoadingComponent>
    </div>
</template>

<script setup lang="ts">
import LoadingComponent from './util/LoadingComponent.vue';

defineProps<{
    label?: string,
    value?: string | number
}>();
</script>

<style scoped>
.stats-component {
    height: 5rem;
}
</style>