<template>
  <table class="tickets-table" v-if="filtered && filtered.length > 0">
    <tr>
      <th>{{ ticketType.name }}</th>
      <th>Preis</th>
      <th>Steuersatz</th>
      <th>Status {{}}</th>
    </tr>
    <tr v-for="ticket in filtered">
      <td><p>{{ ticket.publicId }}</p></td>
      <td v-if="ticket.price">{{ formatPrice(ticket.price) }}</td>
      <td><p>{{ ticket.taxRate }}%</p></td>
      <td>
        <TicketStatusComponent :status="ticket.status"></TicketStatusComponent>
      </td>
    </tr>
  </table>
  <div class="no-tickets" v-if="filtered && filtered.length === 0 && ticketStatus">
    <p>Im {{ ticketType.name }} sind keine Tickets mit Status</p>
    <TicketStatusComponent :status="TicketStatus[ticketStatus]"></TicketStatusComponent>
    <p>vorhanden!</p>
  </div>
  <div v-if="!tickets" class="center-center">
    <LoadingIcon font-size="2rem"></LoadingIcon>
  </div>
</template>

<script setup lang="ts">
import type {Ticket} from '~/classes/Ticket';
import {getTicketsByBookingItemId} from '~/requests/ticket';
import TicketStatusComponent from './TicketStatusComponent.vue';
import type {TicketType} from '~/classes/TicketType';
import { TicketStatus } from '~/classes/TicketStatus';

const props = defineProps<{
  bookingItemId: string,
  ticketType: TicketType
}>();

const tickets: Ref<Ticket[] | undefined> = ref(undefined);
const filtered = computed(filter);
const ticketStatus = computed(() => useBookingSearchStore().getTicketStatus());

function filter() {
  const status = useBookingSearchStore().getTicketStatus();
  if(status != null && tickets.value != null) {
    return tickets.value.filter((item) => {
      if(item.status) {
        return TicketStatus[status] === item.status.toString();
      }
      return false;
    })
  }
  return tickets.value;
}

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

.tickets-table th, .no-tickets {
  text-align: left;
  background-color: rgba(211, 211, 211, 0.26);
}

.no-tickets {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
}
</style>