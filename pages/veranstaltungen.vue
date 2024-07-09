<template>
  <div class="page">
    <ScrollingPage class="narrow" :loading="!events">
      <div class="content">
        <h1>Veranstaltungen</h1>
        <div class="event-container">
          <EventComponent v-for="event in events" :event="event"></EventComponent>
        </div>
      </div>
    </ScrollingPage>
  </div>
</template>

<script lang="ts" setup>
import {Event} from '~/classes/Event';
import EventComponent from '~/components/veranstaltungen/EventComponent.vue';
import {getAllEvents} from '~/requests/event';
import ScrollingPage from '~/components/util/ScrollingPage.vue';

const events: Ref<Event[] | undefined> = ref(undefined);

onMounted(() => {
  getAllEvents((_events: Event[]) => {
    events.value = _events;
  }, () => {
  });
})
</script>

<style scoped>
.event-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 576px) {
  .event-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }

  .page {
    padding: 0;
  }
}
</style>
