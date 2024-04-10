<template>
    <LoadingPage :loading="!event">
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
import { TicketStatus } from '~/classes/TicketStatus';
import { Customer } from '~/classes/Customer';
import TicketComponent from '~/components/veranstaltungen/TicketComponent.vue';

const loading = ref(true);
const event = ref(computed(() => useEventStore().getEvent()));
const tickets = ref([new Ticket("5843934", TicketStatus.PENDING, 10000, 7, new Customer("andreas@mail.de", "Andreas Dinauer", "5843stripeid54389")),
new Ticket("9143934", TicketStatus.PENDING, 9000, 7, new Customer("felix@online.de", "Felix Sewald", "5843stripeid54389")),
new Ticket("2343914", TicketStatus.VALID, 8000, 19, new Customer("andi@gmx.de", "Andreas Ott", "5843stripeid54389")),
new Ticket("7843969", TicketStatus.VALID, 10000, 19, new Customer("andreas@freenet.de", "Andreas Dinauer", "5843stripeid54389")),
new Ticket("1343931", TicketStatus.REDEEMED, 10000, 19, new Customer("felix@mail.de", "Felix Sewald", "5843stripeid54389")),
new Ticket("8784392", TicketStatus.CANCELLED, 10000, 19, new Customer("andi.ott@mail.de", "Andreas Ott", "5843stripeid54389"))
]);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000)
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