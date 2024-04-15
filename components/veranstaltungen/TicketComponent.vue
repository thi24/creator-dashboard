<template>
    <div class="ticket" v-if="ticket.customer">
        <div class="ticket-id">
            <p>{{ ticket.id }}</p>
        </div>
        <div>
            <p>{{ ticket.customer.email }}</p>
        </div>
        <div>
            <p>{{ ticket.customer.name }}</p>
        </div>
        <div class="ticket-status">
            <TicketStatusComponent :status="ticket.status"></TicketStatusComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ticket } from '~/classes/Ticket';
import TicketStatusComponent from './TicketStatusComponent.vue';
import type { TicketStatus } from '~/classes/TicketStatus';

defineProps<{
    ticket: Ticket
}>()
</script>

<style scoped>
.ticket {
    display: contents;
}
.ticket > * {
    border-bottom: 1px solid lightgray;
    height: 2.5rem;
    padding: 0rem 0.75rem;
    display: flex;
    align-items: center;
}
.ticket .ticket-id {
    padding-left: 1rem;
}
.ticket:hover .ticket-id {
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