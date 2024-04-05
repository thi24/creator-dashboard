<template>
    <LoadingPage :loading="!event" :heading="'Veranstaltung'">
        <div v-if="event">
            <h1 class="heading">Veranstaltung: {{ event.eventName }}</h1>
            <p>Eventname: {{ event.eventName }}</p>
            <p>Startet am: {{ event.startsAt }}</p>
            <p>Endet am: {{ event.endsAt }}</p>
            <p>Adresse: {{ event.address.street }}</p>
            <p>Stadt: {{ event.address.zip }} {{ event.address.city }}, {{ event.address.state }}</p>
        </div>
    </LoadingPage>
</template>

<script setup lang="ts">
import LoadingPage from '~/components/LoadingPage.vue';

const loading = ref(true);
const event = ref(computed(() => useEventStore().getEvent()));

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000)
})
</script>

<style scoped>

</style>