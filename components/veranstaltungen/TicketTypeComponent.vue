<template>
    <div class="tickettype">
        <div class="tickettype-status"> </div>
        <div class="tickettype-info">
            <p> {{ ticketType.name }} </p>
            <div class="tickettype-details">
                <p class="grayed-out period">Verkaufszeitraum: {{ dayjs(ticketType.validFrom).format("DD.MM.YYYY H:mm")
                    }}
                    Uhr
                    - {{
                        dayjs(ticketType.validTo).format("DD.MM.YYYY H:mm") }} Uhr</p>
                <p v-if="ticketType.price" class="grayed-out">Preis: {{ Math.round(ticketType.price / 100).toFixed(2)
                    }}€</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TicketType } from '~/classes/TicketType';
import dayjs from 'dayjs';

defineProps<{
    ticketType: TicketType
}>()

</script>

<style scoped>
.tickettype {
    display: flex;
    display: grid;
    grid-template-columns: min-content 1fr;
    border-bottom: lightgray 1px solid;
    padding-left: 0.25rem;
}

.tickettype:hover {
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
    gap: 0.5rem
}

.tickettype-details {
    display: flex;
    justify-content: space-between;
}

.period {
    display: flex
}
</style>