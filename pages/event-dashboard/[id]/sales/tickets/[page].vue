<template>
    <div v-if="tickets && pages" class="sales-table-container">
        <table class="tile ticket-table">
            <tr>
                <th>Id</th>
                <th>Kunde</th>
                <th>Gebucht Am</th>
                <th>Tickettyp</th>
                <th>Preis</th>
                <th>Status</th>
            </tr>
            <tr v-for="ticket in tickets" class="ticket-row">
                <td><p>{{ ticket.publicId }}</p></td>
                <td><p v-if="ticket.customer">{{ ticket.customer.email }}</p></td>
                <th><p class="booked-at">{{ dayjs(ticket.bookedAt).format("DD.MM.YYYY") }}</p></th>
                <td><p v-if="ticket.bookingItem && ticket.bookingItem.ticketType">{{ ticket.bookingItem.ticketType.name }}</p></td>
                <td><p>{{ formatPrice(ticket.price) }}</p></td>
                <td><TicketStatusComponent :status="ticket.status"></TicketStatusComponent></td>
            </tr>
        </table>
        <PaginationComponent :count="pages" :current="pageIndex" :on-change="(page: number) => { useRouter().push('/event-dashboard/' + eventId + '/sales/tickets/' + page) }"></PaginationComponent>
    </div>
    <LoadingComponent :loading="!tickets"></LoadingComponent>
</template>

<script setup lang="ts">
import type { Ticket } from '~/classes/Ticket';
import { getTicketsBySearch } from '~/requests/ticket';
import LoadingComponent from '~/components/util/LoadingComponent.vue';
import TicketStatusComponent from '~/components/veranstaltungen/TicketStatusComponent.vue';
import PaginationComponent from '~/components/PaginationComponent.vue';
import dayjs from 'dayjs';

const tickets: Ref<Ticket[] | undefined> = ref(undefined);
const pages: Ref<number | undefined> = ref(undefined);
const pageIndex: number = Number(useRoute().params.page as string);
const eventId = useRoute().params.id as string;

const search = useBookingSearchStore().getSearch();

watch(search, (newValue) => {
    if(pageIndex !== 0) {
        useRouter().push('/event-dashboard/' + eventId + '/sales/tickets/0')
    } else {
        loadByPage(0);
    }
});

onMounted(() => {
   loadByPage(pageIndex);
});

function loadByPage(page: number) {
    tickets.value = undefined;
    getTicketsBySearch(eventId, search, page, (_tickets: Ticket[], pageSize: number) => {
        tickets.value = _tickets;
        pages.value = pageSize;
    }, () => {});
}
</script>

<style scoped>
.ticket-table {
    width: 100%;
    padding: 0rem;
    table-layout: fixed;
    border-collapse: collapse;
}
.booked-at {
    font-weight: normal;
}
.ticket-table *:is(th, td) {
    text-align: left;
    padding: 0.5rem;
}
.ticket-row {
    border-top: 1px solid lightgray;
}
</style>