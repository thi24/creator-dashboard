<template>
    <ScrollingPage :loading="!event">
        <div class="content ticket-page">
            <div v-if="event">
                <h2>Buchungen</h2>
                <p>{{ event.eventName }}</p>
            </div>
            <LoadingPage :loading="!tickets || !pageSize">
                <div class="tickets">
                    <div class="tile ticket-container">
                        <TicketComponent v-for="ticket in tickets" :ticket="ticket"></TicketComponent>
                    </div>
                    <div class="center-center" v-if="pageSize && tickets">
                        <PaginationComponent :count="pageSize" :current="pageIndex" @set="(pageIndex) => setPageIndex(pageIndex)"></PaginationComponent>
                    </div>
                </div>
            </LoadingPage>
        </div>
    </ScrollingPage>
    <ViewTicketPopup ref="viewTicketPopup"></ViewTicketPopup>
</template>

<script setup lang="ts">
import { Ticket } from '~/classes/Ticket';
import ScrollingPage from '~/components/util/ScrollingPage.vue';
import TicketComponent from '~/components/veranstaltungen/TicketComponent.vue';
import { getTickets } from '~/requests/ticket';
import ViewTicketPopup from '~/components/popups/ViewTicketPopup.vue';
import LoadingPage from '~/components/util/LoadingPage.vue';

const event = ref(computed(() => useEventStore().getEvent()));
const tickets: Ref<Ticket[] | undefined> = ref(undefined);
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
    tickets.value = undefined;
    getTickets(eventId, page, (_tickets: Ticket[], _pageSize: number) => {
        tickets.value = _tickets;
        pageSize.value = _pageSize;
    }, () => { });
}
</script>

<style scoped>
.ticket-page {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    align-items: flex-start;
}

.ticket-container {
    padding: 0px;
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    border-radius: 0.5rem;
    align-items: stretch;
    width: 100%;
    cursor: pointer;
}

.tickets {
    height: 100%;
    gap: 1rem;
    display: grid;
    grid-template-rows: 1fr auto;
    align-items: flex-start;
}

</style>