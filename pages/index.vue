<template>
    <div>

    </div>
</template>

<script lang="ts" setup>

async function testing() {
    console.log('testing')
    const headers = useRequestHeaders(['cookie']) as HeadersInit
    const { data: token } = await useFetch('/api/token', { headers })
    console.log(token)
}


</script>


<style scoped>
</style>