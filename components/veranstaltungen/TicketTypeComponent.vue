<template>
    <div class="ticket ticket-hover">
        <div class="tickettype-status"> </div>
        <div class="tickettype-info">
            <h3>Ticketname: {{ ticketType.name }}</h3>
            <div class="tickettype-details">
                <p>Verkauf Zeitraum: {{ ticketType.validFrom }} - {{ ticketType.validTo }}</p>
                <p>Preis: {{ ticketType.price }} €</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TicketType } from '~/classes/TicketType';

defineProps<{
    ticketType: TicketType
}>()

</script>

<style scoped>
.ticket{
display: flex;
display: grid;
grid-template-columns: min-content 1fr;
cursor: pointer;
border-bottom: grey 0.5px solid;
padding-left: 1rem;
}

.ticket:hover{
    background-color: rgba(243, 242, 242, 0.744);
}

.ticket-hover:hover{
    border-left: var(--primary-color) 0.5rem solid;
}

.tickettype-info{
    display: grid;
    grid-template-rows: 1fr 1fr;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    gap: 1rem
}

.tickettype-details{
    display:flex;
    justify-content: space-between;
}
</style>