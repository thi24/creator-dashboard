<template>
    <button class="button" :class="{ reverse: reverse }"><UiIcon v-if="icon">{{ icon }}</UiIcon><slot></slot></button>
</template>

<script setup lang="ts">
import UiIcon from './UiIcon.vue';

defineProps({
    icon: String,
    reverse: Boolean
})
</script>

<style scoped>
.button {
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 0.25rem;
    padding: 0 0.5rem;
    height: 2rem;
    font-size: 1.1rem;
    background-color: #9c89b8;
    color: white;
    border-radius: 5px;
    border: none;
}
.button * {
    color: white;
    font-size: 1.1rem;
}
.reverse {
    flex-direction: row-reverse;
}
</style>