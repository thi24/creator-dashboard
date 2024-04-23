<template>
    <header class="header">
        <div class="inner-header">
            <div class="logo">
                <h1>Benevolo</h1>
            </div>
            <div class="nav-bar">
                <div class="left-nav-bar">
                    <NuxtLink v-if="token == null" class="header-link" to="/">Home</NuxtLink>
                    <NuxtLink v-if="token != null" class="header-link" to="/veranstaltungen">Veranstaltungen</NuxtLink>
                    <NuxtLink v-if="token != null" class="header-link" to="/veranstaltung-anlegen">Event erstellen</NuxtLink>
                </div>
                <div class="center-center">
                    <NuxtLink class="header-link" to="/profil" v-if="token != null">Profil</NuxtLink>
                    <UiButton icon="logout" @click="logout()" v-if="token != null">Log Out</UiButton>
                </div>
            </div>
        </div>
    </header>

</template>


<script lang="ts" setup>

const token = useCookie("token");

function logout() {
    navigateTo("https://auth.benevolo.de/realms/benevolo/protocol/openid-connect/logout?post_logout_redirect_uri=" + useRuntimeConfig().public.authOriginURL +  "/logout&client_id=benevolo", { external: true})
}
</script>



<style scoped>
.header {
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    border-bottom: 1px solid #eaeaea;
}

.inner-header {
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 1rem;
    gap: 2rem;
}

.nav-bar {
    display: flex;
    justify-content: space-between;
    align-self: center;
}
.left-nav-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.header-link {
    text-decoration: none;
    color: #000000;
    font-size: 1.1rem;
    font-weight: 500;
    padding-top: 2px;
    padding-bottom: 2px;
}
.header-link:hover {
    border-bottom: 2px solid #f28482;
    padding-bottom: 0px;
}
</style>