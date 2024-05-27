<template>
    <div class="scrolling-page">
        <ScrollingComponent v-if="!loading">
            <slot></slot>
        </ScrollingComponent>
        <LoadingComponent :loading="loading"></LoadingComponent>
    </div>
</template>

<script setup lang="ts">
import LoadingIcon from '../LoadingIcon.vue';
import ScrollingComponent from './ScrollingComponent.vue';
import LoadingComponent from './LoadingComponent.vue';

defineProps<{
    loading: boolean
}>();
</script>

<style scoped>
.scrolling-page {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr;
}

@media screen and (max-width: 600px) {
    .scrolling-page {
        min-height: 79vh;
    }
    
}
</style>