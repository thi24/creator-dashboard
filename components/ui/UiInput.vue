<template>
    <div class="field">
        <label>{{ label }}</label>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label: string
}>();
</script>

<style scoped>
.field {
    display: flex;
    gap: 0.25rem;
    flex-direction: column;
}
</style>