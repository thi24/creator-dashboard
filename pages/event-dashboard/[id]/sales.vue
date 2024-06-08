<template>
    <ScrollingPage :loading="!event">
        <div v-if="event" class="content sales-page">
            <div class="space-between-center">
                <div>
                    <h2 v-if="useRoute().fullPath.includes('buchungen')">Buchungen</h2>
                    <h2 v-if="useRoute().fullPath.includes('tickets')">Tickets</h2>
                    <p>{{ event.eventName }}</p>
                </div>
                <ToggleSalesComponent></ToggleSalesComponent>
            </div>
            <SalesHeaderComponent></SalesHeaderComponent>
            <NuxtPage></NuxtPage>
        </div>
    </ScrollingPage>
</template>

<script setup lang="ts">
import SalesHeaderComponent from '~/components/veranstaltungen/SalesHeaderComponent.vue';
import ScrollingPage from '~/components/util/ScrollingPage.vue';
import ToggleSalesComponent from '~/components/veranstaltungen/ToggleSalesComponent.vue';

const event = ref(computed(() => useEventStore().getEvent()));
</script>

<style>
.sales-table-container {
    display: grid;
    gap: 1rem;
    width: 100%;
    height: 100%;
    grid-template-rows: 1fr auto;
    align-items: flex-start;
}
</style>

<style scoped>
.sales-page {
    display: grid;
    grid-template-rows: auto auto 1fr;
}
</style>