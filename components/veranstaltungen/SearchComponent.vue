<template>
    <div class="search-header">
        <div class="tile search-bar">
            <UiInput label="Suche" class="search-input">
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
    flex: 1;
}
.search-bar {
    display: grid;
    grid-template-columns: 3fr repeat(4, 8rem);
    gap: 1rem;
}

@media only screen and (max-width: 1300px) {
    .search-bar {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media only screen and (max-width: 1300px) {
    .search-input {
        grid-column: span 2;
    }
}
</style>