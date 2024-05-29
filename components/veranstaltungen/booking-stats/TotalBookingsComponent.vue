<template>
    <StatsComponent label="Buchungen" :value="bookings"></StatsComponent>
</template>

<script setup lang="ts">
import { getTotalBookings } from '~/requests/booking';

const event = ref(computed(() => useEventStore().getEvent()));

const bookings: Ref<number | undefined> = ref(undefined);
onMounted(() => {
    if(event.value && event.value.id) {
        getTotalBookings(event.value.id, (_bookings: number) => {
            bookings.value = _bookings;
        }, () => {});
    }
});
</script>