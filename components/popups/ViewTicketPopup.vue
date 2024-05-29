<template>
  <PopupTemplate ref="popupTemplate" heading="Ticket">
    <div class="content">
      <div class="col-2 ticket-property-container" v-if="ticket && ticket">
        <div class="tile inverse ticket-property">
          <p>Ticket ID</p>
          <p class="grayed-out">{{ ticket.id }}</p>
        </div>
        <div class="tile inverse ticket-property">
          <p>Ticketart</p>
          <p class="grayed-out">Ticketart</p>
        </div>
        <div class="tile inverse ticket-property">
          <p>Verkaufspreis</p>
          <p class="grayed-out">{{ ticket.price }}</p>
        </div>
        <div class="tile inverse ticket-property">
          <p>Steuersatz</p>
          <p class="grayed-out">{{ ticket.taxRate }}%</p>
        </div>
        <div class="tile inverse ticket-property">
          <p>Kunde</p>
          <p class="grayed-out">Kundenname</p>
        </div>
        <div class="tile inverse ticket-property">
          <p>Kunde ID</p>
          <p class="grayed-out">Kunden Id</p>
        </div>
        <div class="tile inverse ticket-property">
          <p>Ticket Status</p>
          <TicketStatusComponent :status="ticket.status"></TicketStatusComponent>
        </div>
      </div>
      <div class="center-center">
        <UiButton @click="() => popupTemplate.close()">Schließen</UiButton>
      </div>
    </div>
  </PopupTemplate>
</template>

<script lang="ts" setup>
import type {Ticket} from '~/classes/Ticket';
import PopupTemplate from './PopupTemplate.vue';
import TicketStatusComponent from '../veranstaltungen/TicketStatusComponent.vue';
import UiButton from '../ui/UiButton.vue';

const popupTemplate = ref()
const ticket: Ref<Ticket | undefined> = ref(undefined);

function close() {
  popupTemplate.value.close();
}

function open(_ticket: Ticket) {
  ticket.value = _ticket;
  popupTemplate.value.open();
}

defineExpose({
  close,
  open
})
</script>

<style scoped>
.ticket-property {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.25rem;
}

@media (max-width: 576px) {
  .ticket-property-container {
    grid-template-columns: 1fr;
  }
}
</style>