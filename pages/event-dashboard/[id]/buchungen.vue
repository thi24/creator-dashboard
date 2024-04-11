<template>
    <LoadingPage :loading="!event || !tickets">
        <div v-if="event">
            <h1 class="heading">Buchungen: {{ event.eventName }}</h1>
        </div>
        <div class="tile ticket-container">
            <TicketComponent v-for="ticket in tickets" :ticket="ticket"></TicketComponent>
        </div>
    </LoadingPage>
</template>

<script setup lang="ts">
import { Ticket } from '~/classes/Ticket';
import LoadingPage from '~/components/LoadingPage.vue';
import TicketComponent from '~/components/veranstaltungen/TicketComponent.vue';
import { getTickets } from '~/requests/ticket';

const loading = ref(false);
const event = ref(computed(() => useEventStore().getEvent()));
const tickets: Ref<Ticket[] | undefined> = ref(undefined);

onMounted(() => {
    getTickets((_tickets: Ticket[]) => {
        tickets.value = _tickets;
    }, () => {});
})
</script>

<style scoped>
.ticket-container {
    padding: 0px;
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    border-radius: 0.5rem;
    overflow: hidden;
    align-items: center;
}
</style>