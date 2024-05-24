<template>
    <ScrollingPage :loading="!event">
        <div class="content ticket-page">
            <div v-if="event">
                <h2>Buchungen</h2>
                <p>{{ event.eventName }}</p>
            </div>
            <LoadingPage :loading="!bookings">
                <div class="tickets">
                    <table class="tile ticket-container">
                        <tr>
                            <th>Nummer</th>
                            <th>Kunde</th>
                            <th>Gebucht Am</th>
                            <th>Gesamtpreis</th>
                            <th></th>
                        </tr>
                        <BookingComponent v-for="booking in bookings" :booking="booking"></BookingComponent>
                    </table>
                    <div class="center-center" v-if="pageSize">
                        <PaginationComponent :count="pageSize" :current="pageIndex" @set="(pageIndex) => setPageIndex(pageIndex)"></PaginationComponent>
                    </div>
                </div>
            </LoadingPage>
        </div>
    </ScrollingPage> 
    <ViewTicketPopup ref="viewTicketPopup"></ViewTicketPopup>
</template>

<script setup lang="ts">
import ScrollingPage from '~/components/util/ScrollingPage.vue';
import BookingComponent from '~/components/veranstaltungen/BookingComponent.vue';
import ViewTicketPopup from '~/components/popups/ViewTicketPopup.vue';
import LoadingPage from '~/components/util/LoadingPage.vue';
import { getAllBookings } from '~/requests/booking';
import type { Booking } from '~/classes/Booking';

const event = ref(computed(() => useEventStore().getEvent()));
const bookings: Ref<Booking[] | undefined> = ref(undefined);
const pageSize: Ref<number | undefined> = ref(undefined);
const pageIndex: Ref<number> = ref(0);

const viewTicketPopup = ref();

onMounted(() => {
    loadByPage(0);
})

function setPageIndex(index: number) {
    pageIndex.value = index;
    loadByPage(index);
}

function loadByPage(page: number) {
    const eventId: string = useRoute().params.id as string;
    bookings.value = undefined;
    getAllBookings(eventId, (_bookings: Booking[]) => {
        bookings.value = _bookings;
    }, () => { });
}
</script>


<style>
.ticket-container td, .ticket-container th {
    padding: 0.5rem 1rem;
}
table td:first-of-type { 
    width: min-content;
}
</style>

<style scoped>
table {
    border-collapse: collapse;
    table-layout: fixed;
}
th {
    border-bottom: 1px solid lightgray;
    text-align: left;
}
.ticket-page {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    align-items: flex-start;
}

.ticket-container {
    padding: 0px;
}

.tickets {
    height: 100%;
    gap: 1rem;
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: flex-start;
}
</style>