<template>
    <LoadingPage :loading="!event">
        <div class="content ticket-page" v-if="event">
            <div v-if="event">
                <h1>Buchungen: {{ event.eventName }}</h1>
            </div>
            <LoadingPage :loading="!tickets">
                <div class="t" v-if="pageSize">
                    <div class="scroll-container">
                        <div class="tile ticket-container">
                            <TicketComponent v-for="ticket in tickets" :ticket="ticket"></TicketComponent>
                        </div>
                    </div>
                    <PaginationComponent :count="pageSize" :current="pageIndex" @set="(payload: number) => setPageIndex(payload)"></PaginationComponent>
                </div>
            </LoadingPage>
        </div>
    </LoadingPage>
</template>

<script setup lang="ts">
import { Ticket } from '~/classes/Ticket';
import LoadingPage from '~/components/LoadingPage.vue';
import TicketComponent from '~/components/veranstaltungen/TicketComponent.vue';
import { getTickets } from '~/requests/ticket';
import PaginationComponent from '~/components/PaginationComponent.vue';

const event = ref(computed(() => useEventStore().getEvent()));
const tickets: Ref<Ticket[] | undefined> = ref(undefined);
const pageSize: Ref<number | undefined> = ref(undefined);
const pageIndex: Ref<number> = ref(0);

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
    }, () => {});
}
</script>

<style scoped>
.ticket-page {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    align-items: flex-start;
}
.ticket-container {
    padding: 0px;
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    border-radius: 0.5rem;
    overflow: hidden;
    align-items: stretch;
    position: absolute;
    width: 100%;
}
.t {
    height: 100%;
    gap: 1rem;
    display: grid;
    grid-template-rows: 1fr auto;
}
.scroll-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
}
</style>