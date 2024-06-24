<template>
       <div class="page">
        <div class="login-container tile">
            <h1>Benevolo Login</h1>
            <p>Verwalten Sie Ihre Events und verkaufen Sie Tickets mühelos – alles an einem Ort für Ihre Veranstaltung!</p>
            <div class="social-logins">
                <UiButton class="button social-button" @click="login">Login</UiButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { login } from '~/utils/authentication';
</script>


<style scoped>
.page {
    display: flex;
    justify-content: center;
}

.login-container {
    align-self: center;
    padding: 2rem 4rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
}

.social-logins {
    display: flex;
    flex-direction: column;
}

#github-icon {
    margin-left: 10px;
    color: #000;
}

.social-button {
    display: flex;
    justify-content: space-between;
    fill: white;
    padding: 1.5rem;
    font-size: 1.2rem;
    width: 15rem;
}
</style>