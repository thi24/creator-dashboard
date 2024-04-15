<template>
    <h1>Logged out</h1>
</template>


<script setup lang="ts">
onMounted(() => {
    const token = useCookie("token")
    token.value = undefined
})
</script>


<style scoped>

</style>