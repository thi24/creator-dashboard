<template>
    <div class="loading-page">
        <div v-if="!loading">
            <slot></slot>
        </div>
        <div class="center-center" v-if="loading">
            <LoadingIcon></LoadingIcon>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoadingIcon from './LoadingIcon.vue';

defineProps<{
    loading: boolean
}>();
</script>

<style scoped>
.loading-page {
    min-height: 100%;
    display: grid;
    grid-template-rows: 1fr;
}

.center-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<style>
.loading-page .heading {
    margin-bottom: 1rem;
}
.content.center {
    justify-self: center;
    display: inline;
}
</style>