<template>
    <div class="search-header">
        <div class="tile search-bar">
            <UiInput label="Suche">
              <input type="text" v-model="search.term">
            </UiInput>
            <UiInput label="Gebucht ab">
              <input type="date" v-model="search.dateFrom">
            </UiInput>
            <UiInput label="Gebucht bis">
              <input type="date" v-model="search.dateTo">
            </UiInput>
            <UiInput label="Gesamtpreis ab">
              <input type="number" v-model="search.priceFrom">
            </UiInput>
            <UiInput label="Gesamtpreis bis">
              <input type="number" v-model="search.priceTo">
            </UiInput>
          </div>
        </div>
</template>

<script setup lang="ts">
const search = computed(() => useBookingSearchStore().getSearch());
</script>

<style scoped>
.search-header {
    display: grid;
    grid-template-columns: 1fr;
}
.search-bar {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
    gap: 1rem;
}
</style>