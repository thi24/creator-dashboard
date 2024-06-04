<template>
  <ScrollingPage :loading="!event">
    <div class="content ticket-page">
      <div v-if="event">
        <h2>Tickettypen</h2>
        <p>{{ event.eventName }}</p>
      </div>
      <LoadingPage :loading="loading">
        <div class="form tile">
          <TicketTypeComponent @update="loadTicketTypes()"
                               v-for="ticketType in ticketTypes" :ticketType="ticketType">
          </TicketTypeComponent>
          <div class="empty-ticket-container" @click="saveTicketPopup.open()">
            <h3>Neuen Tickettypen anlegen</h3>
          </div>
        </div>
        <SaveTicketTypePopup ref="saveTicketPopup"
                             @update="(payload: TicketType) => { pushTicketType(payload) }">
        </SaveTicketTypePopup>
      </LoadingPage>
    </div>
  </ScrollingPage>
</template>

<script setup lang="ts">
import ScrollingPage from '~/components/util/ScrollingPage.vue';
import {TicketType} from '~/classes/TicketType';
import {getAllTicketTypes} from '~/requests/tickettype';
import SaveTicketTypePopup from '~/components/popups/SaveTicketTypePopup.vue';
import TicketTypeComponent from '~/components/veranstaltungen/TicketTypeComponent.vue';
import LoadingPage from '~/components/util/LoadingPage.vue';

const loading = ref(false);
const event = ref(computed(() => useEventStore().getEvent()));
const ticketTypes: Ref<TicketType[] | undefined> = ref(undefined);
const saveTicketPopup = ref();

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

onMounted(() => {
  loadTicketTypes();
})


function pushTicketType(payload: TicketType) {
  if (ticketTypes != null) {
    ticketTypes.value?.push(payload)
  }
}
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