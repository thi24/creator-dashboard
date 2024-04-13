<template>
    <PopupTemplate ref="popupTemplate" heading="Ticketklasse anlegen">
        <div class="tickettype-container">
            <UiInput label="Ticketname">
                <input type="text" id="Name" v-model="ticketType.name">
            </UiInput>
            <UiInput label="Ticketanzahl">
                <input type="number" id="eventname" v-model="ticketType.capacity">
            </UiInput>
            <UiInput label="Preis">
                <input type="number" id="eventname" v-model="ticketType.price">
            </UiInput>
            <UiInput label="Steuerschlüssel">
                <input type="number" id="eventname" v-model="ticketType.taxRate">
            </UiInput>
            <UiInput label="Verkauf Start">
                <input type="datetime-local" id="start-date" v-model="ticketType.validFrom">
            </UiInput>
            <UiInput label="Verkauf Ende">
                <input type="datetime-local" id="end-date" v-model="ticketType.validTo">
            </UiInput>
        </div>
    <UiButton @click="saveTicket(ticketType)" icon="add_circle" :reverse="true" :loading="loading" class="save-btn">Erstellen</UiButton>
    </PopupTemplate>
</template>

<script lang="ts" setup>
import PopupTemplate from './PopupTemplate.vue';
import UiInput from '../ui/UiInput.vue';
import UiButton from '../ui/UiButton.vue';
import { TicketType } from '~/classes/TicketType';
import { saveTicketType } from '~/requests/tickettype';

const ticketType: Ref<TicketType> = ref(new TicketType());
const loading: Ref<boolean> = ref(false);
const popupTemplate = ref()
const eventId = useRoute().params.id as string;

function saveTicket(ticketType: TicketType) {
    let onSuccess = () => {
        console.log("Gespeichert");
        loading.value = false;
    }

    let onError = () => {
        console.log("Fehler")
        loading.value = false;
    }
    loading.value = true;
    ticketType.eventid = eventId;
    saveTicketType(ticketType, onSuccess, onError);
}

function close() {
    popupTemplate.value.close();
}

function open() {
    popupTemplate.value.open();
}

defineExpose({
    close,
    open
})
</script>

<style>
.tickettype-container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 0.5rem;
    column-gap: 1rem;
}
</style>