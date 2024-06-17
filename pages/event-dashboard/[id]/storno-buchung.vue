
<template>
  <ScrollingPage :loading ="!event">
    <div class="content ticket-page">
      <div>
        <h2>Storno Anfragen</h2>
        <p>Event Name</p>
      </div>
      <LoadingPage :loading="!stornos">
        <div class="storno">
          <div class="title ticket-container">
            <div class="stornoGrid ticket">
              <div class="ticket__id">
                <p>TicketTypeName</p>
                <p class="grayed-out">Storno Public_ID</p>
                <p class="grayed-out">Buchung_ID</p>
              </div>
              <div class="customer-center">
                <p>Customer-Email</p>
              </div>
              <div class="customer-center">
                <p>Preis</p>
              </div>
              <div>
                <P>Eingereicht</P>
              </div>
              <div>
                <p>Status</p>
              </div>
            </div>
          </div>
        </div>
        <StornoComponent v-for="storno in stornos" :storno="storno">
        </StornoComponent>
      </LoadingPage>
    </div>
  </ScrollingPage>
</template>

<script setup lang="ts">
import { Storno } from '~/classes/Storno';
import ScrollingPage from '~/components/util/ScrollingPage.vue';
import StornoComponent from '~/components/veranstaltungen/StornoComponent.vue';
import { getStorno } from '~/requests/storno';
import LoadingPage from '~/components/util/LoadingPage.vue';

const stornos: Ref<Storno[] | undefined> = ref(undefined);

const event = ref(computed(() => useEventStore().getEvent()));

onMounted(() => {
    loadStornos();
})

function loadStornos() {
    const eventId: string = useRoute().params.id as string;
    getStorno(eventId, (_stornos: Storno[]) => {
        stornos.value = _stornos;
    }, () => { });
}
</script>

<style scoped>
.headline {
  padding: 10px 0px 0px 5px;
}

.stornoGrid {
  display: grid;
  grid-template-columns: 10rem 13rem 7rem 5rem 5rem;
  grid-auto-flow: column;
}

.accept__BT {
  margin: 0px 0px 0px 10px;
  padding: 0px 10px 0px 10px;
  border: 1.5px solid black;
  border-radius: 2.5rem;
}

.decline__BT {
  margin: 0px 0px 0px 10px;
  padding: 0px 10px 0px 10px;
  border: 1.5px solid black;
  border-radius: 2.5rem;
}

.decline__BT:hover {
  background-color: var(--primary-color);
  cursor: pointer;
}

.accept__BT:hover {
  background-color: lightgreen;
  cursor: pointer;
}

.customer-center {
  padding: 0px 0px 0px 10px;
}

.ticket-page {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
}

.ticket-container {
  margin: 5px;
  padding: 0px;
  display: grid;
  border-radius: 0.5rem;
  align-items: stretch;
  width: 100%;
  background-color: white;
}

.tickets {
  height: 100%;
  gap: 1rem;
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: flex-start;
}

.ticket {
  padding: 0.25rem 0.75rem;
  gap: 0.25rem;
  align-items: center;
  border-bottom: 1px solid lightgray;
}

.ticket:last-child {
  border-bottom: 0px;
}

.ticket__id,
.ticket__property {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1rem;
}

.ticket__property {
  padding-left: 3rem;
}

.ticket:hover .ticket__id {
  border-left: 0.25rem solid var(--primary-color);
  padding-left: 0.75rem;
}

.ticket-status {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 576px) {
  .ticket-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .ticket > * {
    padding-left: 1rem;
    border-bottom: none;
  }

  .ticket > *:nth-of-type(3), .ticket > *:nth-of-type(4) {
    border-bottom: 1px solid lightgray;
  }

  .ticket:hover > .ticket > *:nth-of-type(1), .ticket:hover > *:nth-of-type(3) {
    border-left: 0.25rem solid var(--primary-color);
    padding-left: 0.75rem;
  }

  .ticket-status {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
