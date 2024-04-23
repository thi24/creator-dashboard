<template>
    <PopupTemplate ref="popupTemplate" heading="Ticketklasse anlegen">
        <div class="tickettype-container">
            <UiInput label="Ticketname">
                <input type="text" id="Name" required v-model="ticketType.name">
            </UiInput>
            <UiInput label="Ticketanzahl">
                <input type="number" id="eventname" required v-model="ticketType.capacity">
            </UiInput>
            <UiInput label="Preis">
                <input type="number" id="eventname" required v-model="price">
            </UiInput>
            <UiInput label="Steuerschlüssel">
                <input type="number" id="eventname" required v-model="ticketType.taxRate">
            </UiInput>
            <UiInput label="Verkauf Start">
                <input type="datetime-local" id="start-date" required v-model="ticketType.validFrom">
            </UiInput>
            <UiInput label="Verkauf Ende">
                <input type="datetime-local" id="end-date" required v-model="ticketType.validTo">
            </UiInput>

        </div>
        <UiButton @click="saveTicket(), close()" icon="add_circle" :reverse="true" :loading="loading" class="save-btn">
            Erstellen</UiButton>
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

const price = computed({
    get(): string {
        if (ticketType.value.price != null) {
            return (ticketType.value.price / 100).toString()
        };
        return ("").toString();
    },
    set(v: string) {
        ticketType.value.price = Number(v) * 100;
    }
});

function saveTicket() {

    let onSuccess = () => {
        console.log("Gespeichert");
        loading.value = false;
    }

    let onError = () => {
        console.log("Fehler")
        loading.value = false;
    }
    loading.value = true;
    ticketType.value.eventId = eventId;
    saveTicketType(ticketType.value, onSuccess, onError);
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
.tickettype-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 0.5rem;
    column-gap: 1rem;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    appearance: textfield;
}
</style>