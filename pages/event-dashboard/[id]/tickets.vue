<template>
    <ScrollingPage :loading="!event || !ticketTypes" :heading="'Tickettypen'">
        <div class="narrow">
            <h1 class="heading">Tickettypen: {{ event?.eventName }}</h1>
            <div class="form tile">
                <TicketTypeComponent v-for="ticketType in ticketTypes" :ticketType="ticketType"></TicketTypeComponent>
                <div class="empty-ticket-container" @click="saveTicketPopup.open()">
                    <h3>Neuen Tickettypen anlegen</h3>
                </div>
            </div>
        </div>
        <SaveTicketTypePopup ref="saveTicketPopup"></SaveTicketTypePopup>
    </ScrollingPage>
</template>

<script setup lang="ts">
import ScrollingPage from '~/components/util/ScrollingPage.vue';
import { TicketType } from '~/classes/TicketType';
import { getAllTicketTypes } from '~/requests/tickettype';
import SaveTicketTypePopup from '~/components/popups/SaveTicketTypePopup.vue';
import TicketTypeComponent from '~/components/veranstaltungen/TicketTypeComponent.vue';

const loading = ref(false);
const event = ref(computed(() => useEventStore().getEvent()));
const ticketTypes: Ref<TicketType[] | undefined> = ref(undefined);
const saveTicketPopup = ref();

onMounted(() => {
    const eventId = useRoute().params.id as string;

    let onSuccess = (_ticketTypes: TicketType[]) => {
        ticketTypes.value = _ticketTypes;
        console.log("Geladen");
        loading.value = false;
    }

    let onError = () => {
        console.log("Fehler")
        loading.value = false;
    }
    loading.value = true;
    getAllTicketTypes(eventId, onSuccess, onError);
})

</script>

<style scoped>
.tile {
    padding: 0;
}

.form {
    display: grid;
    grid-auto-rows: 1fr;
    overflow: hidden;
}

.empty-ticket-container {
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 1rem;
    cursor: pointer;
}

.empty-ticket-container:hover {
    background-color: rgba(243, 242, 242, 0.744);
    transition: 0.3s;
}
</style>