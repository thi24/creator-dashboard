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
import { Event } from '~/classes/Event';
import EventComponent from '~/components/veranstaltungen/EventComponent.vue';
import { getAllEvents } from '~/requests/event';
import ScrollingPage from '~/components/util/ScrollingPage.vue';

const events: Ref<Event[] | undefined> = ref(undefined);

onMounted(() => {
    getAllEvents((_events: Event[]) => {
        events.value = _events;
    }, () => { });
})

function getEvents(): Event[] {
    const results: Event[] = [];
    const event = new Event();
    event.id = '383f700f-5449-4e40-b509-bee0b5d139d6';
    event.eventName = "Hippi Parade Smoke Weed 420";
    event.description = "Bekiffen Sie sich grenzenlos. Aber lassen Sie sich nicht vom SEK (Söder Einsatzkomando) erwischen.";
    results.push(event);
    const event2 = new Event();
    event2.id = '383f700f-5449-4e40-b509-bee0b5d139d6';
    event2.eventName = "Ü80 Seniorenparty";
    event2.description = "Verbringen Sie einen entspannten Abend mit Horst und Gertlinde. Inklusive Bingo und Kreuzworträtsel.";
    results.push(event2);
    const event3 = new Event();
    event3.id = '383f700f-5449-4e40-b509-bee0b5d139d6';
    event3.eventName = "Tomatenschlacht in Seoul";
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

@media (max-width: 576px) {
    .event-container {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1rem;
    }

    .page {
        padding: 0;
    }

    .scrolling-content {
        padding: 0;
    }
}
</style>
