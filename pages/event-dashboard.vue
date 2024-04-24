<template>
    <div class="account-layout">
        <nav class="nav-bar">
            <NuxtLink :to="'/event-dashboard/' + eventId" :class="{ active: useRoute().fullPath.startsWith('') }">Veranstaltung</NuxtLink>
            <NuxtLink :to="'/event-dashboard/' + eventId + '/tickets'">Tickets</NuxtLink>
            <NuxtLink :to="'/event-dashboard/' + eventId + '/buchungen'">Buchungen</NuxtLink>
            <p class="entry-button" @click="() => entryComponent.show()">Einlass</p>
        </nav>
        <div>
            <NuxtPage></NuxtPage>
        </div>
    </div>
    <EntryComponent ref="entryComponent"></EntryComponent>
</template>

<script setup lang="ts">
import { useEventStore } from '~/stores/EventStore';
import EntryComponent from '~/components/EntryComponent.vue';

const event = ref(computed(() => useEventStore().getEvent()));
const eventId = useRoute().params.id as string;

onMounted(() => {
    useEventStore().init(eventId);
});

const entryComponent = ref();
</script>

<style scoped>
.account-layout {
    display: grid;
    grid-template-columns: auto 1fr;
    align-self: stretch;
}
.nav-bar {
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-right: 1px solid #eaeaea;
    padding: 1rem 2rem;
}
.nav-bar > * {
    padding: 0.5rem 0.75rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
}
.nav-bar > *.router-link-active {
    background-color: var(--primary-color);
    color: white;
    border-radius: 10rem;
}
.scroll-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
}
.scrolling-div {
    padding: 1rem;
    height: 100%;
    position: absolute;
}
.entry-button {
    border: 3px solid black;
    border-radius: 2.5rem;
    cursor: pointer;
}
</style>