<template>
    <div class="ticket">
        <div class="tickettype-status"> </div>
        <div class="tickettype-info">
            <h3> {{ _ticketType.ticketType.name }} </h3>
            <div class="tickettype-details">
                <p>Verkauf Zeitraum: {{ _ticketType.ticketType.validFrom }} - {{ _ticketType.ticketType.validTo }}</p>
                <p>Preis: {{ price }} €</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TicketType } from '~/classes/TicketType';

const _ticketType = defineProps<{
    ticketType: TicketType
}>()


const price = computed({
    get(): string {
        if (_ticketType.ticketType.price != null) {
            return (_ticketType.ticketType.price / 100).toString()
        };
        return ("").toString();
    },
    set(v: string) {
        _ticketType.ticketType.price = Number(v) / 100;
    }
});
</script>

<style scoped>
.ticket {
    display: flex;
    display: grid;
    grid-template-columns: min-content 1fr;
    cursor: pointer;
    border-bottom: lightgray 1px solid;
    padding-left: 0.25rem;
}

.ticket:hover {
    background-color: rgba(243, 242, 242, 0.744);
    border-left: var(--primary-color) 0.25rem solid;
    padding-left: 0rem;
}

.tickettype-info {
    display: grid;
    grid-template-rows: 1fr 1fr;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    gap: 1rem
}

.tickettype-details {
    display: flex;
    justify-content: space-between;
}
</style>