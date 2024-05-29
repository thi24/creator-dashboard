<template>
  <ScrollingPage :loading="!event">
    <div class="content ticket-page">
      <div v-if="event">
        <h2>Buchungen</h2>
        <p>{{ event.eventName }}</p>
      </div>
      <div class="tickets">
        <div class="tile search-bar">
          <UiInput label="Suche">
            <input type="text" v-model="search.term">
          </UiInput>
          <UiInput label="Gebucht ab">
            <input type="date" v-model="search.dateFrom">
          </UiInput>
          <UiInput label="Gebucht bis">
            <input type="date" v-model="search.dateTo">
          </UiInput>
          <UiInput label="Gesamtpreis ab">
            <input type="number" v-model="search.priceFrom">
          </UiInput>
          <UiInput label="Gesamtpreis bis">
            <input type="number" v-model="search.priceTo">
          </UiInput>
        </div>
        <div class="bookings center-center">
          <NuxtPage></NuxtPage>
        </div>
      </div>
    </div>
  </ScrollingPage>
  <ViewTicketPopup ref="viewTicketPopup"></ViewTicketPopup>
</template>

<script setup lang="ts">
import ScrollingPage from '~/components/util/ScrollingPage.vue';
import ViewTicketPopup from '~/components/popups/ViewTicketPopup.vue';
import {useBookingSearchStore} from '~/stores/BookingSearchStore';

const search = computed(() => useBookingSearchStore().getSearch());

const event = ref(computed(() => useEventStore().getEvent()));
const viewTicketPopup = ref();

</script>

<style scoped>
.ticket-page {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
}

.tickets {
  height: 100%;
  gap: 1rem;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
}

.search-bar {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
}

.bookings {
  height: 100%;
}
</style>