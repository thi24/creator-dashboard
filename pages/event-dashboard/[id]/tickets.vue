<template>
    <LoadingPage :loading="!event">
        <div v-if="event">
            <h1 class="heading">Tickets: {{ event.eventName }}</h1>
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