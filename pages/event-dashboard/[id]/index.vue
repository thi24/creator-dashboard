<template>
  <ScrollingPage :loading="!event">
    <div>
      <div v-if="event">
        <h2>Veranstaltung</h2>
        <p>{{ event.eventName }}</p>
      </div>
      <div v-if="event" class="event-container">
        <div class="event-detail-wrapper">
          <p class="event-detail">Eventname:</p>
          <p class="event-detail"> {{ event.eventName }}</p>
        </div>
        <div class="event-detail-wrapper">
          <p class="event-detail">Startet am:</p>
          <p class="event-detail"> {{ dayjs(event.startsAt).format("DD.MM.YYYY") }}</p>
        </div>
        <div class="event-detail-wrapper">
          <p class="event-detail">Endet am:</p>
          <p class="event-detail"> {{ dayjs(event.endsAt).format("DD.MM.YYYY") }}</p>
        </div>
        <div class="event-detail-wrapper">
          <p class="event-detail">Adresse:</p>
          <p class="event-detail"> {{ event.address.street }}</p>
        </div>
        <div class="event-detail-wrapper">
          <p class="event-detail">Stadt:</p>
          <p class="event-detail"> {{ event.address.zip }} {{ event.address.city }}, {{ event.address.state }}</p>
        </div>
      </div>
    </div>
  </ScrollingPage>
</template>

<script setup lang="ts">
import ScrollingPage from '~/components/util/ScrollingPage.vue';
import dayjs from 'dayjs';

const loading = ref(true);
const event = ref(computed(() => useEventStore().getEvent()));

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000)
})
</script>

<style scoped>
.event-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  margin-top: 20px;
}

.event-detail-wrapper {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.event-detail {
  font-size: 16px;
  margin-right: 10px;
}
</style>