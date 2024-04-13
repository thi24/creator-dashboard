<template>
<div class="narrow">
    <h1 class="heading">Tickets</h1>
        <div class="form tile">
            <div class="ticket" v-if="event && event.ticketTypes != null"> 
                <p>Ticketname:</p>
            </div>
            <div class="empty-ticket-container" @click="saveTicketPopup.open()">
                <p>Neuen Tickettypen anlegen</p>
            </div>
        </div>
</div>
<SaveTicketTypePopup ref="saveTicketPopup"></SaveTicketTypePopup>
</template>

<script setup lang="ts">
import LoadingPage from '~/components/LoadingPage.vue';
import UiButton from '~/components/ui/UiButton.vue';
import { Event } from '@/classes/Event';
import { TicketType } from '~/classes/TicketType';
import { getAllTicketTypes } from '~/requests/tickettype';
import PopupTemplate from '~/components/popups/PopupTemplate.vue';
import SaveTicketTypePopup from '~/components/popups/SaveTicketTypePopup.vue';


const loading = ref(true);
const event = ref(computed(() => useEventStore().getEvent()));
const ticketType: Ref<TicketType> = ref(new TicketType());
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
    getAllTicketTypes(eventId , onSuccess, onError);
})

</script>

<style scoped>
.form {
    gap: 1rem;
    display: grid;
    grid-auto-rows: 1fr;
}
.empty-ticket-container {
border: 0.1rem grey dashed;
border-radius: 1rem;
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

.ticket{
display: flex;
border: 0.1rem grey solid;
border-radius: 1rem;
display: grid;
padding: 0.5rem;
cursor: pointer;
}

.ticket:hover{
    background-color: rgba(243, 242, 242, 0.744);
    transition: 0.3s;
}
</style>