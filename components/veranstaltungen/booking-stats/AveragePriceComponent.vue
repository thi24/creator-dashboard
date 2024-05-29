<template>
    <StatsComponent label="Gesamtumsatz" :value="formatPrice(averagePrice)"></StatsComponent>
</template>

<script setup lang="ts">
import { getAveragePrice } from '~/requests/booking';

const event = ref(computed(() => useEventStore().getEvent()));

const averagePrice: Ref<number | undefined> = ref(undefined);
onMounted(() => {
    if(event.value && event.value.id) {
        getAveragePrice(event.value.id, (_averagePrice: number) => {
            averagePrice.value = _averagePrice;
        }, () => {});
    }
});
</script>