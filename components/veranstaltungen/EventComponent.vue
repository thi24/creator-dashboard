<template>
    <div class="event">
        <img class="event__image" :src="event.thumbnail" alt="">
        <div class="event__body">
            <h3 class="event__heading">{{ event.eventName }}</h3>
            <p class="event__description">{{ event.description }}</p>
            <UiButton class="event__view" @click="() => useRouter().push('/event-dashboard')">Ansehen</UiButton>
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
    display: grid;
    grid-template-rows: auto 1fr;
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
    justify-content: space-between;
    gap: 0.25rem;
}
.event__view {
    align-self: center;
}
</style>