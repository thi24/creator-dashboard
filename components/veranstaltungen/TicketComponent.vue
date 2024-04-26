<template>
    <div class="ticket" v-if="ticket.customer">
        <div class="ticket__id">
            <p v-if="ticket.ticketType">{{ ticket.ticketType.name }}</p>
            <p class="grayed-out">{{ ticket.publicId }}</p>
        </div>
        <div class="ticket__property">
            <p>{{ ticket.customer.email }}</p>
            <p v-if="ticket.bookedAt" class="grayed-out">{{ dayjs(ticket.bookedAt).format("DD.MM.YYYY") }}</p>
        </div>
        <div class="ticket__property" v-if="ticket.price">
            <p>{{ (ticket.price / 100).toFixed(2) }}€</p>
            <p class="grayed-out">{{ ticket.taxRate }}%</p>
        </div>
        <div class="ticket-status">
            <TicketStatusComponent :status="ticket.status"></TicketStatusComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ticket } from '~/classes/Ticket';
import TicketStatusComponent from './TicketStatusComponent.vue';
import dayjs from 'dayjs';

defineProps<{
    ticket: Ticket
}>()
</script>

<style scoped>
.ticket {
    display: contents;
}

.ticket>* {
    padding: 0.25rem 0.75rem;
    gap: 0.25rem;
    display: flex;
    align-items: center;
}

.ticket:not(:last-of-type)>* {
    border-bottom: 1px solid lightgray;
}

.ticket__id,
.ticket__property {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 1rem;
}

.ticket__property {
    padding-left: 3rem;
}

.ticket:hover .ticket__id {
    border-left: 0.25rem solid var(--primary-color);
    padding-left: 0.75rem;
}

.ticket:last-of-type {
    border-bottom: none;
}

.ticket-status {
    display: flex;
    justify-content: flex-end;
}
</style>