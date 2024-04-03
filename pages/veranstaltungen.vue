<template>
    <div class="narrow">
        <div class="event-container">
            <EventComponent v-for="event in events" :event="event"></EventComponent>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { Event } from '~/classes/Event';
import EventComponent from '~/components/veranstaltungen/EventComponent.vue';

const events: Ref<Event[]> = ref(getEvents());

function getEvents(): Event[] {
    const results: Event[] = [];
    const event = new Event();
    event.name = "Hippi Parade Smoke Weed 420";
    event.thumbnail = "https://c8.alamy.com/compde/w095m6/marihuana-raucher-leuchten-bei-420-an-der-jahrlichen-420-marihuana-party-in-der-hippie-hill-im-golden-gate-park-in-san-francisco-am-20-april-2018-obwohl-2018-das-erste-jahr-ist-der-rechtlichen-cannibis-in-kalifornien-die-partei-hat-schon-seit-vielen-jahren-foto-von-terry-schmittupi-w095m6.jpg";
    event.description = "Bekiffen sie sich grenzenlos. Aber lassen sie sich nicht vom SEK (Söder Einsatzkomando) erwischen.";
    results.push(event);
    const event2 = new Event();
    event2.name = "Heroin Injection Party am Nordbahnhof";
    event2.thumbnail = "https://image.stern.de/7837062/t/sh/v4/w1440/r1.7778/-/bahnhofsviertel.jpg";
    event2.description = "Genieße den goldenen Schuss Panzerschokolade. Reisen sie bequem mit dem Zug an.";
    results.push(event2);
    return results;
}
</script>

<style scoped>
.event-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}
</style>