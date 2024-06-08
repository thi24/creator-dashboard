<template>
    <div class="sales-header content">
        <div class="col-4">
            <TotalBookingsComponent></TotalBookingsComponent>
            <TotalTicketsComponent></TotalTicketsComponent>
            <AveragePriceComponent></AveragePriceComponent>
            <TotalPriceComponent></TotalPriceComponent>
        </div>
        <div class="search-bar">
            <SearchComponent></SearchComponent>
            <UiInput v-if="useRoute().fullPath.includes('tickets')" class="tile status-filter" label="Ticketstatus">
                <div class="status-input-container">
                    <div class="status-input valid" :class="{ checked: useBookingSearchStore().getSearch().status.includes(TicketStatus.VALID) }" @click="useBookingSearchStore().toggle(TicketStatus.VALID)"><p>Gültig</p></div>
                    <div class="status-input redeemed" :class="{ checked: useBookingSearchStore().getSearch().status.includes(TicketStatus.REDEEMED) }" @click="useBookingSearchStore().toggle(TicketStatus.REDEEMED)"><p>Entwertet</p></div>
                    <div class="status-input cancelled" :class="{ checked: useBookingSearchStore().getSearch().status.includes(TicketStatus.CANCELLED) }" @click="useBookingSearchStore().toggle(TicketStatus.CANCELLED)"><p>Storniert</p></div>
                </div>
            </UiInput>
        </div>
    </div>
</template>

<script setup lang="ts">
import SearchComponent from './SearchComponent.vue';
import TotalPriceComponent from '~/components/veranstaltungen/booking-stats/TotalPriceComponent.vue';
import TotalBookingsComponent from '~/components/veranstaltungen/booking-stats/TotalBookingsComponent.vue';
import TotalTicketsComponent from '~/components/veranstaltungen/booking-stats/TotalTicketsComponent.vue';
import AveragePriceComponent from '~/components/veranstaltungen/booking-stats/AveragePriceComponent.vue';
import { TicketStatus } from '~/classes/TicketStatus';
</script>

<style scoped>
.search-bar {
    display: flex;
    gap: 1rem;
}
.status-filter {
    width: 30rem;
}
.status-input {
    height: 37px;
    border-radius: 0.5rem;
    background-color: rgba(209, 209, 209, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.status-input * {
    color: black;
}
.status-input.checked * {
    color: white;
}
.status-input.valid.checked {
    background-color: rgb(8, 210, 15);
}
.status-input.redeemed.checked {
    background-color: rgb(160, 160, 160);
}
.status-input.cancelled.checked {
    background-color: rgb(210, 21, 8);
}
.status-input-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
}
</style>