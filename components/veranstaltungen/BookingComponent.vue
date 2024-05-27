<template>
    <tr class="booking-stats" :class="{ highlighted: showTickets }">
        <td><p v-if="booking.id">{{ booking.id.substring(0, 8) }}</p></td>
        <td><p v-if="booking.customer">{{ booking.customer.email }}</p></td>
        <td><p>{{ dayjs(booking.bookedAt).format("DD.MM.YYYY") }}</p></td>
        <td><p v-if="booking.totalPrice">{{ formatPrice(booking.totalPrice) }}</p></td>
        <td class="dropdown" @click="() => showTickets = !showTickets">
            <UiIcon v-if="showTickets">navigate_next</UiIcon>
            <UiIcon v-if="!showTickets">keyboard_arrow_down</UiIcon>
        </td>
    </tr>
    <tr class="ticket-stats" v-if="showTickets" v-for="bookingItem in booking.bookingItems">
        <td colspan="5">
            <TicketsComponent v-if="bookingItem.id && bookingItem.ticketType" :booking-item-id="bookingItem.id" :ticket-type="bookingItem.ticketType"></TicketsComponent>
        </td>
    </tr>
</template>

<script setup lang="ts">
import type { Booking } from '~/classes/Booking';
import dayjs from 'dayjs';
import TicketsComponent from './TicketsComponent.vue';
import { formatPrice } from '#imports';

defineProps<{
    booking: Booking
}>()

const showTickets = ref(false);
</script>

<style scoped>
.booking-stats {
    border-top: 1px solid rgb(194, 194, 194);
}
.booking-stats.highlighted {
    background-color: rgba(223, 223, 223, 0.671);
}
.ticket-stats {
    border-top: 1px solid rgba(211, 211, 211, 0.473);
}
.dropdown {
    user-select: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>