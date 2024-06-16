<template>
  <PopupTemplate ref="popupTemplate" heading="Ticketklasse ändern">
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
      <UiInput label="VVK manuell stoppen">
        <label class="switch">
          <input @click="changeStatus()" type="checkbox" id="VVKStatus" :checked="!ticketType.active"
                 :class="{ active: ticketType.active }">
          <span class="slider round"></span>
        </label>
      </UiInput>
    </div>
    <div v-if="errorMessage" class="error-wrapper">
      <p class="error-message">{{ errorMessage }}</p>
    </div>
    <UiButton @click="_updateTicketType()" icon="add_circle" :reverse="true" :loading="loading" class="save-btn">
      Anpassen
    </UiButton>
  </PopupTemplate>
</template>

<script lang="ts" setup>
import PopupTemplate from './PopupTemplate.vue';
import UiInput from '@/components/ui/UiInput.vue';
import UiButton from '@/components/ui/UiButton.vue';
import {TicketType} from '~/classes/TicketType';
import {updateTicketType} from '~/requests/tickettype';
import {Event} from '~/classes/Event';

const ticketType: Ref<TicketType> = ref(new TicketType());
const loading: Ref<boolean> = ref(false);
const errorMessage: Ref<string> = ref("");
const popupTemplate = ref()
const eventId = useRoute().params.id as string;
const emits = defineEmits(['update']);

const price = computed({
  get(): string {
    if (ticketType.value.price != null) {
      return (ticketType.value.price / 100).toString()
    }
    ;
    return ("");
  },
  set(v: string) {
    ticketType.value.price = Number(v) * 100;
  }
});

function _updateTicketType() {
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
  if (ticketType.value.taxRate > 100) {
    errorMessage.value = "Steuerschlüssel darf nicht größer als 100 sein";
    return
  }
  if (ticketType.value.taxRate < 0) {
    errorMessage.value = "Steuerschlüssel darf nicht kleiner als 0 sein";
    return
  }
  if (ticketType.value.validFrom == undefined) {
    errorMessage.value = "Bitte Verkaufsstart eingeben";
    return
  }
  if (ticketType.value.validTo == undefined) {
    errorMessage.value = "Bitte Verkaufsende eingeben";
    return
  }
  if (ticketType.value.validFrom > ticketType.value.validTo) {
    errorMessage.value = "Verkaufsende muss nach Verkaufstart liegen";
    return
  }

  let onSuccess = () => {
    loading.value = false;
    close();
  }

  let onError = () => {
    loading.value = false;
    errorMessage.value = "Fehler beim Speichern";
    setTimeout(() => {
      errorMessage.value = "";
    }, 4000);
  }
  loading.value = true;
  let event = new Event();
  event.id = eventId;
  ticketType.value.event = event;
  updateTicketType(ticketType.value, onSuccess, onError);
}

function changeStatus() {
  ticketType.value.active = !ticketType.value.active;
}

function close() {
  emits('update');
  popupTemplate.value.close();
}

function open(_ticketType: TicketType) {
  ticketType.value = _ticketType;
  popupTemplate.value.open();
}

defineExpose({
  close,
  open
})


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

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 23px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #d21508;
}

input:focus + .slider {
  box-shadow: 0 0 1px #d21508;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
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