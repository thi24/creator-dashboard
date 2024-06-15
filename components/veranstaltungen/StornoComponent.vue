<template>
  <div class="storno">
    <div class="title ticket-container">
      <div class="stornoGrid ticket">
        <div class="ticket__id">
          <p>{{ storno.ticket?.bookingItem?.ticketType?.name }}</p>
          <p class="grayed-out id_padding">{{ storno.id }}</p>
          <p class="grayed-out id_padding">{{ storno.ticket?.bookingItem?.id }}</p>
        </div>
        <div class="customer-center">
          <p>{{ storno.booking?.customer?.email }}</p>
        </div>
        <div v-if="storno.ticket?.price" class="customer-center">
          <p>{{ (storno.ticket?.price / 100).toFixed(2)  }}€</p>
        </div>
        <div>
          <p>{{ dayjs(storno.requestedAt).format("DD.MM.YYYY H:mm") }}</p>
        </div>
        <div>
          <div v-if="storno.cancelStatus == TicketStatus.PENDING" class="accept__BT">
            <p @click="
              responseToProcessEngine(
                storno.ticket?.bookingItem?.ticketType?.event?.id,
                storno.ticket?.id,
                storno.ticket?.price,
                storno.booking?.customer?.stripeId,
                true,
                storno.id)">Accept</p>
          </div>
          <div v-if="storno.cancelStatus == TicketStatus.PENDING" class="decline__BT">
            <p @click="
              responseToProcessEngine(
                storno.ticket?.bookingItem?.ticketType?.event?.id,
                storno.ticket?.id,
                storno.ticket?.price,
                storno.booking?.customer?.stripeId,
                false,
                storno.id)">Decline</p>
          </div>
          <div v-if="storno.cancelStatus == TicketStatus.VALID">
            <p>Genehmigt</p>
          </div>
          <div v-if="storno.cancelStatus == TicketStatus.CANCELLED">
            <p>Abgelehnt</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Storno} from '~/classes/Storno';
import dayjs from 'dayjs';
import { TicketStatus } from '~/classes/TicketStatus';
import { responseToProcessEngine } from '~/requests/storno';

defineProps<{
  storno: Storno
}>()
</script>

<style scoped>
.headline {
  padding: 10px 0px 0px 5px;
}

.id_padding {
  padding: 5px 0px 5px 0px;
}

.stornoGrid {
  display: grid;
  grid-template-columns: 10rem 13rem 7rem 7rem 7rem;
  grid-auto-flow: column;
}

.accept__BT {
  margin: 0px 0px 0px 10px;
  padding: 0px 0px 5px 0px;
  border: 1.5px solid black;
  border-radius: 2.5rem;
}

.decline__BT {
  margin: 0px 0px 0px 10px;
  padding: 0px 0px 5px 0px;
  border: 1.5px solid black;
  border-radius: 2.5rem;
}

.decline__BT:hover {
  background-color: var(--primary-color);
  cursor: pointer;
}

.accept__BT:hover {
  background-color: lightgreen;
  cursor: pointer;
}

.customer-center {
  padding: 0px 0px 0px 10px;
}

.ticket-page {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
}

.ticket-container {
  margin: 5px;
  padding: 0px;
  display: grid;
  border-radius: 0.5rem;
  align-items: stretch;
  width: 100%;
  background-color: white;
}

.tickets {
  height: 100%;
  gap: 1rem;
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: flex-start;
}

.ticket {
  padding: 0.25rem 0.75rem;
  gap: 0.25rem;
  align-items: center;
  border-bottom: 1px solid lightgray;
}

.ticket:last-child {
  border-bottom: 0px;
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

.ticket-status {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 576px) {
  .ticket-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .ticket > * {
    padding-left: 1rem;
    border-bottom: none;
  }

  .ticket > *:nth-of-type(3), .ticket > *:nth-of-type(4) {
    border-bottom: 1px solid lightgray;
  }

  .ticket:hover > .ticket > *:nth-of-type(1), .ticket:hover > *:nth-of-type(3) {
    border-left: 0.25rem solid var(--primary-color);
    padding-left: 0.75rem;
  }

  .ticket-status {
    display: flex;
    justify-content: flex-start;
  }
}
</style>