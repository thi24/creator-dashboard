<template>
    <HeaderComponent></HeaderComponent>
        <NuxtPage></NuxtPage>
    <FooterComponent></FooterComponent>
</template>

<script lang="ts" setup>

const login = ref(false);
/*
onMounted(async () => {
    login.value = await checkLogin()
})

async function checkLogin() {
    const headers = useRequestHeaders(['cookie']) as HeadersInit
    const { data: token } = await useFetch('/api/token', { headers })
    console.log(token)
    if (token.value) {
        return true
    } else {
        return false
    }
}
*/
</script>
