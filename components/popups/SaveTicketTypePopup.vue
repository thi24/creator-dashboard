<template>
  <PopupTemplate ref="popupTemplate" heading="Ticketklasse anlegen">
    <div class="tickettype-container">
      <UiInput label="Ticketname">
        <input type="text" id="Name" required v-model="ticketType.name">
      </UiInput>
      <UiInput label="Ticketanzahl">
        <input type="number" id="eventname" required v-model="ticketType.capacity">
      </UiInput>
      <UiInput label="Preis in €">
        <input type="number" id="eventname" required v-model="price">
      </UiInput>
      <UiInput label="Steuerschlüssel in %">
        <input type="number" id="eventname" required v-model="ticketType.taxRate">
      </UiInput>
      <UiInput label="Verkauf Start">
        <input type="datetime-local" id="start-date" required v-model="ticketType.validFrom">
      </UiInput>
      <UiInput label="Verkauf Ende">
        <input type="datetime-local" id="end-date" required v-model="ticketType.validTo">
      </UiInput>
    </div>
    <div v-if="errorMessage" class="error-wrapper">
      <p class="error-message">{{ errorMessage }}</p>
    </div>
    <UiButton @click="saveTicket()" icon="add_circle" :reverse="true" :loading="loading" class="save-btn">Erstellen
    </UiButton>
  </PopupTemplate>
</template>

<script lang="ts" setup>
import PopupTemplate from './PopupTemplate.vue';
import UiInput from '../ui/UiInput.vue';
import UiButton from '../ui/UiButton.vue';
import {TicketType} from '~/classes/TicketType';
import {saveTicketType} from '~/requests/tickettype';
import {Event} from '~/classes/Event';
import type {WritableComputedRef} from 'vue';

const ticketType: Ref<TicketType> = ref(new TicketType());
const loading: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref("");
const popupTemplate = ref()
const eventId = useRoute().params.id as string;

const price: WritableComputedRef<number | undefined> = computed({
  get(): number {
    if (ticketType.value.price != undefined) {
      return Math.round(ticketType.value.price * 100) / 10000
    }
    ;
    return 0;
  },
  set(v: number) {
    ticketType.value.price = v * 100;
  }
});

function saveTicket() {
  if (ticketType.value.name == undefined || ticketType.value.name == "") {
    errorMessage.value = "Bitte Ticketname eingeben";
    return
  }
  if (ticketType.value.capacity == undefined) {
    errorMessage.value = "Bitte Ticketanzahl eingeben";
    return
  }
  if (ticketType.value.price == undefined) {
    errorMessage.value = "Bitte Preis eingeben";
    return
  }
  if (ticketType.value.taxRate == undefined) {
    errorMessage.value = "Bitte Steuerschlüssel eingeben";
    return
  }

  let onSuccess = (_ticketType: TicketType) => {
    loading.value = false;
    close(structuredClone(_ticketType));
    ticketType.value.capacity = undefined;
    ticketType.value.name = "";
    ticketType.value.price = undefined;
    ticketType.value.taxRate = undefined;
    ticketType.value.validFrom = new Date();
    ticketType.value.validTo = new Date();
    ticketType.value.entryStarted = false;
  }

  let onError = () => {
    loading.value = false;
  }
  loading.value = true;
  let event = new Event();
  event.id = eventId;
  ticketType.value.event = event;
  saveTicketType(ticketType.value, onSuccess, onError);
}

function close(_e: TicketType) {
  emit("update", _e);
  popupTemplate.value.close();
}

function open() {
  popupTemplate.value.open();
}

defineExpose({
  close,
  open
})

const emit = defineEmits<{
  (e: "update", payload: TicketType): void
}>()
</script>

<style scoped>
.tickettype-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 0.5rem;
  column-gap: 1rem;
}

.error-wrapper {
  border: var(--primary-color) 2px solid;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-message {
  size: 1rem
}

@media (max-width: 576px) {

  .tickettype-container {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    column-gap: 1rem;
  }
}
</style>