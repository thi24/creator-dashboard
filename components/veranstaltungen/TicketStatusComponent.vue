<template>
    <p class="ticket-label" v-if="status != null":class="{ pending: status === TicketStatus.PENDING,
        valid: status === TicketStatus.VALID,
        redeemed: status === TicketStatus.REDEEMED,
        cancelled: status === TicketStatus.CANCELLED
     }">{{ getLabel(status) }}</p>
</template>

<script setup lang="ts">
import { TicketStatus } from '~/classes/TicketStatus';

defineProps<{
    status: TicketStatus | undefined
}>();

function getLabel(status: TicketStatus) {
    if(status === TicketStatus.PENDING) {
        return "Ausstehend";
    }
    if(status === TicketStatus.VALID) {
        return "Gültig";
    }
    if(status === TicketStatus.REDEEMED) {
        return "Entwertet";
    }
    if(status === TicketStatus.CANCELLED) {
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
}
.ticket-status * {
    color: white;
}
.pending {
    background-color: #8a8a8a;
}
.valid {
    background-color: #08d20f;
}
.redeemed {
    background-color: #d21508;
}
.cancelled {
    background-color: #d21508;
}
</style>