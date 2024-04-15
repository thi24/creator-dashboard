<template>
    <div class="page">
        <LoadingPage class="narrow" :loading="!events">
            <h1 class="page__heading">Veranstaltungen</h1>
            <div class="event-container">
                <EventComponent v-for="event in events" :event="event"></EventComponent>
            </div>
        </LoadingPage>
    </div>
</template>


<script lang="ts" setup>
import { Event } from '~/classes/Event';
import EventComponent from '~/components/veranstaltungen/EventComponent.vue';
import { getAllEvents } from '~/requests/event';
import LoadingPage from '~/components/LoadingPage.vue';

const events: Ref<Event[] | undefined> = ref(undefined);

onMounted(() => {
    getAllEvents((_events: Event[]) => {
        events.value = _events;
    }, () => {});
})

function getEvents(): Event[] {
    const results: Event[] = [];
    const event = new Event();
    event.id = '383f700f-5449-4e40-b509-bee0b5d139d6';
    event.eventName = "Hippi Parade Smoke Weed 420";
    event.thumbnail = "https://c8.alamy.com/compde/w095m6/marihuana-raucher-leuchten-bei-420-an-der-jahrlichen-420-marihuana-party-in-der-hippie-hill-im-golden-gate-park-in-san-francisco-am-20-april-2018-obwohl-2018-das-erste-jahr-ist-der-rechtlichen-cannibis-in-kalifornien-die-partei-hat-schon-seit-vielen-jahren-foto-von-terry-schmittupi-w095m6.jpg";
    event.description = "Bekiffen Sie sich grenzenlos. Aber lassen Sie sich nicht vom SEK (Söder Einsatzkomando) erwischen.";
    results.push(event);
    const event2 = new Event();
    event2.id = '383f700f-5449-4e40-b509-bee0b5d139d6';
    event2.eventName = "Ü80 Seniorenparty";
    event2.thumbnail = "https://img.luzernerzeitung.ch/2018/4/11/2b210e9f-2912-48b2-a392-8b5f87e9f79a.jpeg?width=640&height=360&fit=bound&quality=75&auto=webp&crop=640,360,x0,y32&wmark=none";
    event2.description = "Verbringen Sie einen entspannten Abend mit Horst und Gertlinde. Inklusive Bingo und Kreuzworträtsel.";
    results.push(event2);
    const event3 = new Event();
    event3.id = '383f700f-5449-4e40-b509-bee0b5d139d6';
    event3.eventName = "Tomatenschlacht in Seoul";
    event3.thumbnail = "https://www.stuttgarter-zeitung.de/media.media.1405e2b5-5149-4906-bc6d-29b99a1ded4b.original1024.jpg";
    event3.description = "Beschmeißen Sie sich mit Tomaten und Tomatenpampe.";
    results.push(event3);
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
