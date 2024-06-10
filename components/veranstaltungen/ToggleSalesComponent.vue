<template>
    <div class="toggle-sales">
        <NuxtLink class="toggle-button" :class="{ active: useRoute().path.includes('buchungen') }" @click="nav('buchungen')">Buchungen</NuxtLink>
        <NuxtLink class="toggle-button" :class="{ active: useRoute().path.includes('tickets') }" @click="nav('tickets')">Tickets</NuxtLink>
    </div>
</template>

<script setup lang="ts">
function nav(path: string) {
    const eventId = useRoute().params.id as string;
    useRouter().push("/event-dashboard/" + eventId + "/sales/" + path + "/0");
}
</script>

<style scoped>
.toggle-sales {
    width: 14rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 1.25rem;
    cursor: pointer;
}
.toggle-button {
    width: 7rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
}
.active {
    color: white;
    background-color: var(--primary-color);
    border-radius: 1.25rem;
}
</style>