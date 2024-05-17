<template>
    <ScrollingPage :loading="!event">
        <div v-if="event">
            <h2>Analyse</h2>
            <p>{{ event.eventName }}</p>
        </div>
        <div class="charts">
            <div class="full-size-chart">
                <h3>Event Seitenaufrufe, Buchungen und Tickets</h3>
                <ClientOnly fallback-tag="span" fallback="Lade Diagramm...">
                    <EventViewsChart v-if="event" :event="event"></EventViewsChart>
                </ClientOnly>
            </div>
            <div class="full-size-chart">
                <h3>No Show Quote</h3>
                <ClientOnly fallback-tag="span" fallback="Lade Diagramm...">
                    <NoShowChart v-if="event" :event="event"></NoShowChart>
                </ClientOnly>
            </div>
            <div class="full-size-chart">
                <h3>Einlass</h3>
                <ClientOnly fallback-tag="span" fallback="Lade Diagramm...">
                    <HistogramEinlass v-if="event" :event="event"></HistogramEinlass>
                </ClientOnly>
            </div>
        </div>
    </ScrollingPage>

</template>


<script setup lang="ts">
import ScrollingPage from '~/components/util/ScrollingPage.vue';
import EventViewsChart from '~/components/veranstaltungen/charts/EventViewsChart.vue';
import HistogramEinlass from '~/components/veranstaltungen/charts/HistogramEinlass.vue';
import NoShowChart from '~/components/veranstaltungen/charts/NoShowChart.vue';

const event = ref(computed(() => useEventStore().getEvent()));


</script>


<style scoped>
.full-size-chart {
    margin-top: 20px;
    background-color: #ffffff;
    border-radius: 0.5rem;
    padding: 20px;
}
</style>