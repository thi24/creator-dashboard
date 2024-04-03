<template>
    <div class="event">
        <img class="event__image" :src="event.thumbnail" alt="">
        <div class="event__body">
            <h3 class="event__heading">{{ event.name }}</h3>
            <p class="event__description">{{ event.description }}</p>
            <UiButton>Ansehen</UiButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import type { Event } from '~/classes/Event';

defineProps<{
    event: Event
}>()
</script>

<style scoped>
.event {
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
}
.event__image {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
}
.event__body {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
}
</style>