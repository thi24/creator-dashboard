<template>
    <div class="account-layout">
        <nav class="nav-bar">
            <NuxtLink to="/event-dashboard">Veranstaltung</NuxtLink>
            <NuxtLink to="/event-dashboard/tickets">Tickets</NuxtLink>
            <NuxtLink to="/event-dashboard/buchungen">Buchungen</NuxtLink>
        </nav>
        <div>
            <NuxtPage></NuxtPage>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEventStore } from '~/stores/EventStore';

onMounted(() => {
    let eventId = useRoute().params.id as string;
    useEventStore().init(eventId);
});
</script>

<style scoped>
.account-layout {
    display: grid;
    grid-template-columns: auto 1fr;
    align-self: stretch;
}
.account-layout > * {
    padding: 2rem;
}
.nav-bar {
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-right: 1px solid #eaeaea;
}
.nav-bar > * {
    padding: 0.5rem 0.75rem;
}
.nav-bar > *.router-link-exact-active {
    background-color: var(--primary-color);
    color: white;
    border-radius: 10rem;
}
</style>