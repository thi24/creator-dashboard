<template>
  <table class="tickets-table">
    <tr>
      <th>{{ ticketType.name }}</th>
      <th>Preis</th>
      <th>Steuersatz</th>
      <th>Status</th>
    </tr>
    <tr v-for="ticket in tickets">
      <td><p>{{ ticket.publicId }}</p></td>
      <td v-if="ticket.price">{{ formatPrice(ticket.price) }}</td>
      <td><p>{{ ticket.taxRate }}%</p></td>
      <td>
        <TicketStatusComponent :status="ticket.status"></TicketStatusComponent>
      </td>

    </tr>
  </table>
  <div v-if="!tickets" class="center-center">
    <LoadingIcon font-size="2rem"></LoadingIcon>
  </div>
</template>

<script setup lang="ts">
import type {Ticket} from '~/classes/Ticket';
import {getTicketsByBookingItemId} from '~/requests/ticket';
import TicketStatusComponent from './TicketStatusComponent.vue';
import type {TicketType} from '~/classes/TicketType';

const props = defineProps<{
  bookingItemId: string,
  ticketType: TicketType
}>();

const tickets: Ref<Ticket[] | undefined> = ref(undefined);

onMounted(() => {
  getTicketsByBookingItemId(props.bookingItemId, (_tickets: Ticket[]) => {
    tickets.value = _tickets;
  }, () => {
  });
});
</script>

<style scoped>
.tickets-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.tickets-table th {
  text-align: left;
  background-color: rgba(211, 211, 211, 0.26);
}
</style>