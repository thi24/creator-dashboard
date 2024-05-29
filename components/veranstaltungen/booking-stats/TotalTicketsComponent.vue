<template>
    <StatsComponent label="Tickets" :value="tickets"></StatsComponent>
</template>

<script setup lang="ts">
import { getTotalTickets } from '~/requests/booking';

const event = ref(computed(() => useEventStore().getEvent()));

const tickets: Ref<number | undefined> = ref(undefined);
onMounted(() => {
    if(event.value && event.value.id) {
        getTotalTickets(event.value.id, (_tickets: number) => {
            tickets.value = _tickets;
        }, () => {});
    }
});
</script>
