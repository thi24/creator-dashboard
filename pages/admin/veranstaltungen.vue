<template>
    <h1>Veranstaltungen</h1>
    <p v-for="event in events">{{ event.name }}, {{ event.startsAt }} - {{ event.endsAt }}</p>
</template>

<script setup lang="ts">
import { getAllEvents } from '@/requests/event'
import type { Event } from '~/classes/Event';

const events: Ref<Event[] | undefined> = ref(undefined);

onMounted(() => {
    getAllEvents((_events: Event[]) => {
        events.value = _events;
    }, () => {});
})
</script>