<template>
  <p class="ticket-label" v-if="status != null" :class="{
        valid: status.toString() === TicketStatus[TicketStatus.VALID],
        redeemed: status.toString() === TicketStatus[TicketStatus.REDEEMED],
        cancelled: status.toString() === TicketStatus[TicketStatus.CANCELLED]
     }">{{ getLabel(status) }}</p>
</template>

<script setup lang="ts">
import {TicketStatus} from '~/classes/TicketStatus';

defineProps<{
  status: TicketStatus | string | undefined
}>();

function getLabel(status: TicketStatus | string) {
  if (status.toString() === TicketStatus[TicketStatus.VALID]) {
    return "Gültig";
  }
  if (status.toString() === TicketStatus[TicketStatus.REDEEMED]) {
    return "Entwertet";
  }
  if (status.toString() === TicketStatus[TicketStatus.CANCELLED]) {
    return "Storniert";
  }
  return undefined;
}
</script>

<style scoped>
.ticket-label {
  background-color: black;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  width: 6rem;
  display: flex;
  justify-content: center;
  color: white;
}

.valid {
  background-color: #08d20f;
}

.redeemed {
  background-color: #a0a0a0;
}

.cancelled {
  background-color: #d21508;
}
</style>