<template>
  <div class="col-2">
    <div class="tile">
      <div class="entry-start-heading">
        <h3>Einlass</h3>
        <label class="switch">
          <input @click="changeEventStatus()" type="checkbox" :checked="event.entryStarted"
                 :class="{ active: event.entryStarted }">
          <span class="slider round"></span>
        </label>
      </div>

      <table class="entry-start-table" v-if="event.entryStarted">
        <tr>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <td>
            <p>Einlass für alle TicketTypen starten</p>
          </td>
          <td>
            <label class="switch">
              <input @click="changeAllTicketTypesStatus()" type="checkbox" :checked="areAllTicketTypesActive()"
                     :class="{ active: areAllTicketTypesActive() }" :disabled="!event.entryStarted">
              <span class="slider round"></span>
            </label>
          </td>
        </tr>
        <tr v-for="ticketType in ticketTypes">
          <td>
            <p> {{ ticketType.name }}</p>
          </td>
          <td>
            <label class="switch">
              <input @click="changeSingleTicketTypeStatus(ticketType)" type="checkbox"
                     :checked="ticketType.entryStarted"
                     :class="{ active: ticketType.entryStarted }" :disabled="!event.entryStarted">
              <span class="slider round"></span>
            </label>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script setup lang="ts">
import {Event} from '~/classes/Event';
import {TicketType} from "~/classes/TicketType";
import {updateEntry} from "~/requests/event";
import {getAllTicketTypes, updateEntryStatus} from "~/requests/tickettype";

const loading = ref(false);
const ticketTypes: Ref<TicketType[] | undefined> = ref(undefined);

onMounted(() => {
  if (props.event.entryStarted) {
    loadTicketTypes();
  }
})

const props = defineProps<{
  event: Event;

}>()

function changeEventStatus() {
  props.event.entryStarted = !props.event.entryStarted;
  let onSuccess = () => {
    if (props.event.entryStarted) {
      loadTicketTypes();
    }
  }

  let onError = () => {
  };

  updateEntry(props.event, onSuccess, onError);
}

function changeSingleTicketTypeStatus(ticketType: TicketType) {
  ticketType.entryStarted = !ticketType.entryStarted;

  let onSuccess = () => {
    loading.value = false;
    close();
  }

  let onError = () => {
    loading.value = false;
  }
  loading.value = true;

  updateEntryStatus(ticketType, onSuccess, onError);
}

function loadTicketTypes() {
  loading.value = true;
  const eventId = useRoute().params.id as string;

  let onSuccess = (_ticketTypes: TicketType[]) => {
    ticketTypes.value = _ticketTypes;
    loading.value = false;
  }

  let onError = () => {
    loading.value = false;
  }
  getAllTicketTypes(eventId, onSuccess, onError);
}

function changeAllTicketTypesStatus() {
  if (!ticketTypes.value) {
    return;
  }

  // Überprüfen, ob alle Tickettypen aktiviert sind
  const allActive = areAllTicketTypesActive()

  // Wenn alle aktiv sind, setzen Sie alle auf inaktiv. Andernfalls setzen Sie alle auf aktiv.
  const newStatus = !allActive;

  for (let ticketType of ticketTypes.value) {
    ticketType.entryStarted = newStatus;

    let onSuccess = () => {
      loading.value = false;
    }

    let onError = () => {
      loading.value = false;
    }

    loading.value = true;
    updateEntryStatus(ticketType, onSuccess, onError);
  }
}

function areAllTicketTypesActive() {
  if (!ticketTypes.value) {
    return false;
  }

  return ticketTypes.value.every(ticketType => ticketType.entryStarted);
}

</script>


<style scoped>
.entry-start-table {
  width: 100%;
}

.entry-start-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background-color: #08d20f;
}

input:focus + .slider {
  box-shadow: 0 0 1px #08d20f;
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
</style>