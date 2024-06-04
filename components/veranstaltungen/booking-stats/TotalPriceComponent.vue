<template>
    <StatsComponent label="Gesamtumsatz" :value="formatPrice(totalPrice)"></StatsComponent>
</template>

<script setup lang="ts">
import { getTotalPrice } from '~/requests/booking';

const event = ref(computed(() => useEventStore().getEvent()));

const totalPrice: Ref<number | undefined> = ref(undefined);
onMounted(() => {
    if(event.value && event.value.id) {
        getTotalPrice(event.value.id, (_totalPrice: number) => {
            totalPrice.value = _totalPrice;
        }, () => {});
    }
});
</script>