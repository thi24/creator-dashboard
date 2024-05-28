<template>
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
        <PaginationComponent :count="pageSize" :current="pageIndex" :on-change="(page: number) => useRouter().push('/event-dashboard/' + event?.id + '/buchungen/' + page)"></PaginationComponent>
    </div>
    <ViewTicketPopup ref="viewTicketPopup"></ViewTicketPopup>
</template>

<script setup lang="ts">
import PaginationComponent from '~/components/PaginationComponent.vue';
import BookingComponent from '~/components/veranstaltungen/BookingComponent.vue';
import ViewTicketPopup from '~/components/popups/ViewTicketPopup.vue';
import type { Booking } from '~/classes/Booking';
import { getAllBookings } from '~/requests/booking';
import type { BookingSearch } from '~/classes/BookingSearch';
import { jsonToUrlParams } from '~/utils/util';

const event = ref(computed(() => useEventStore().getEvent()));
const bookings: Ref<Booking[] | undefined> = ref(undefined);
const pageSize: Ref<number | undefined> = ref(undefined);

const viewTicketPopup = ref();

const search = useBookingSearchStore().getSearch();
let pageIndex = Number(useRoute().params.page as string);

watch(search, (value) => {
    pageIndex = 0;
    loadByPage(value, 0);
});

onMounted(() => {
    loadByPage(search, pageIndex);
})

function loadByPage(search: BookingSearch, page: number) {
    const eventId: string = useRoute().params.id as string;
    bookings.value = undefined;
    getAllBookings(eventId, search, page, (_bookings: Booking[], _pageSize: number) => {
        bookings.value = _bookings;
        pageSize.value = _pageSize;
    }, () => {});
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

.ticket-container {
    padding: 0px;
}
</style>