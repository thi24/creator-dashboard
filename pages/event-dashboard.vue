<template>
    <div class="account-layout">
        <nav class="nav-bar">
            <NuxtLink :to="'/event-dashboard/' + eventId" :class="{ active: useRoute().fullPath.startsWith('') }">Veranstaltung</NuxtLink>
            <NuxtLink :to="'/event-dashboard/' + eventId + '/ticket-typen'">Tickets</NuxtLink>
            <NuxtLink :to="'/event-dashboard/' + eventId + '/buchungen'">Buchungen</NuxtLink>
        </nav>
        <div>
            <NuxtPage></NuxtPage>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEventStore } from '~/stores/EventStore';

const event = ref(computed(() => useEventStore().getEvent()));
const eventId = useRoute().params.id as string;

onMounted(() => {
    useEventStore().init(eventId);
});
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
</style>