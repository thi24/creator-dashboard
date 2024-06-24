<template>
  <ScrollingPage :loading="!event">
    <div class="content" v-if="event">
      <div>
        <h2>Veranstaltung</h2>
        <p>{{ event.eventName }}</p>
      </div>
      <div class="col-4">
        <div class="tile">
          <h3>Startet am</h3>
          <p>{{ dayjs(event.startsAt).format("DD.MM.YYYY") }}</p>
        </div>
        <div class="tile">
          <h3>Endet am</h3>
          <p>{{ dayjs(event.endsAt).format("DD.MM.YYYY") }}</p>
        </div>
        <div class="tile">
          <h3>Adresse</h3>
          <p>{{ event.address.street }}</p>
        </div>
        <div class="tile">
          <h3>Ort</h3>
          <p>{{ event.address.zip }} {{ event.address.city }}, {{ event.address.state }}</p>
        </div>
      </div>
      <StartEntryComponent :event="event"></StartEntryComponent>
    </div>
  </ScrollingPage>
</template>

<script setup lang="ts">
import ScrollingPage from '~/components/util/ScrollingPage.vue';
import dayjs from 'dayjs';
import StartEntryComponent from "~/components/veranstaltungen/StartEntryComponent.vue";

const loading = ref(true);
const event = ref(computed(() => useEventStore().getEvent()));

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000)
})
</script>

<style scoped>
@media (max-width: 900px) {
  .col-4 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>