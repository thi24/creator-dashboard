<template>
    <header class="header">
        <div class="inner-header">
            <div class="logo">
                <img src="https://via.placeholder.com/50" alt="logo">
            </div>
            <div class="nav-bar">
                <div class="left-nav-bar">
                    <NuxtLink class="header-link" to="/">Home</NuxtLink>
                    <NuxtLink class="header-link" to="/event-erstellen">Event erstellen</NuxtLink>
                    <NuxtLink class="header-link" to="/veranstaltungen">Veranstaltungen</NuxtLink>
                </div>
                <NuxtLink class="header-link" to="/profil">Profil</NuxtLink>
            </div>
        </div>
    </header>

</template>


<script lang="ts" setup>


</script>



<style scoped>
.header {
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    border: 1px solid #eaeaea;
}

.inner-header {
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 1rem;
}

.nav-bar {
    display: flex;
    justify-content: space-between;
    align-self: center;
}
.left-nav-bar {
    display: flex;
    gap: 1rem;
    margin-left: 8%;
    
}

.header-link {
    text-decoration: none;
    color: #000000;
    font-size: 1.2rem;
    font-weight: 500;
    padding-top: 1px;
    padding-bottom: 1px;
}
.header-link:hover {
    border-bottom: 1px solid #f28482;
    padding-bottom: 0px;
}
</style>