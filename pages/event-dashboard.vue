<template>
    <div class="account-layout">
        <nav class="nav-bar">
            <NuxtLink to="/admin">Home</NuxtLink>
            <NuxtLink to="/admin/veranstaltungen">Veranstaltungen</NuxtLink>
        </nav>
        <div>
            <NuxtPage></NuxtPage>
        </div>
    </div>
</template>

<style scoped>
.account-layout {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    align-self: stretch;
}
.account-layout > * {
    padding: 1rem;
}
.nav-bar {
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
</style>