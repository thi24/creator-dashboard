<template> 
  <ScrollingPage :loading="!event">
    <div class="content ticket-page">
      <div v-if="event">
        <h2>Buchungen</h2>
        <p>{{ event.eventName }}</p>
      </div>
      <div class="col-4">
        <TotalBookingsComponent></TotalBookingsComponent>
        <TotalTicketsComponent></TotalTicketsComponent>
        <AveragePriceComponent></AveragePriceComponent>
        <TotalPriceComponent></TotalPriceComponent>
      </div>
      <div class="tickets">
        <div class="search-header">
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
          <div class="tile">
            <UiInput label="Ticketstatus">
              <select v-model="useBookingSearchStore().ticketStatus">
                <option :value="undefined">Beliebig</option>
                <option :value="TicketStatus.VALID">Gültig</option>
                <option :value="TicketStatus.REDEEMED">Entwertet</option>
                <option :value="TicketStatus.CANCELLED">Storniert</option>
              </select>
            </UiInput>
          </div>
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
import { useBookingSearchStore } from '~/stores/BookingSearchStore';
import TotalPriceComponent from '~/components/veranstaltungen/booking-stats/TotalPriceComponent.vue';
import TotalBookingsComponent from '~/components/veranstaltungen/booking-stats/TotalBookingsComponent.vue';
import TotalTicketsComponent from '~/components/veranstaltungen/booking-stats/TotalTicketsComponent.vue';
import AveragePriceComponent from '~/components/veranstaltungen/booking-stats/AveragePriceComponent.vue';
import { TicketStatus } from '~/classes/TicketStatus';

const search = computed(() => useBookingSearchStore().getSearch());
const ticketStatus = ref(computed(() => useBookingSearchStore().getTicketStatus()));

const event = ref(computed(() => useEventStore().getEvent()));
const viewTicketPopup = ref();
</script>

<style scoped>
.ticket-page {
  height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr;
  align-items: flex-start;
}

.tickets {
  height: 100%;
  gap: 1rem;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
}

.search-header {
  display: grid;
  grid-template-columns: 5fr 1fr;
  gap: 1rem;
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