<template>
    <LoadingPage :loading="loading" heading="Eventname">
        <p>Page Content</p>
    </LoadingPage>
</template>

<script setup lang="ts">
import LoadingPage from '~/components/LoadingPage.vue';

const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000)
})
</script>

<style scoped>

</style>