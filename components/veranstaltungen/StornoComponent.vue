<template>
    <div class="ticket" v-if="storno">
        <div class="ticket__id">
            <p v-if="storno.bookingItem && storno.bookingItem.ticketType">{{ storno.bookingItem.ticketType.name }}</p>
            <p class="grayed-out">{{ storno.publicId }}</p>
        </div>
            //Soll rein?
            <p>Kunde</p>
        <div>
        <div>
            <button type="button">Accept</button>
            <button type="button">Decline</button>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Storno } from '~/classes/Storno';
import dayjs from 'dayjs';

defineProps<{
    storno: Storno
}>()
</script>

<style scoped>
.ticket {
    display: contents;
}

.ticket > * {
    padding: 0.25rem 0.75rem;
    gap: 0.25rem;
    display: flex;
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

.ticket:last-of-type > * {
    border-bottom: none;
}

.ticket-status {
    display: flex;
    justify-content: flex-end;
}

@media (max-width: 576px) {
    .ticket > * {
        padding-left: 1rem;
        border-bottom: none;
    }
    .ticket > *:nth-of-type(3), .ticket > *:nth-of-type(4) {
        border-bottom: 1px solid lightgray;
    }
    .ticket:hover > .ticket > *:nth-of-type(1), .ticket:hover > *:nth-of-type(3)  {
        border-left: 0.25rem solid var(--primary-color);
        padding-left: 0.75rem;
    }
    .ticket-status {
        display: flex;
        justify-content: flex-start;
    }
}
</style>