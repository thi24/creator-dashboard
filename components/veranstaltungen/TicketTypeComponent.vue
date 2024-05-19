<template>
    <div class="tickettype">
        <div class="status">
            <p v-if="ticketType.active && isValidDate" :class="{ active: ticketType.active }">VVK aktiv</p>
            <p v-else class="inactive">VVK inaktiv</p>
        </div>
        <span></span>
        <p class="tickettype-name"> {{ ticketType.name }} </p>
        <div class="edit-button-div">
            <button class="edit-button" @click="() => editTicketPopup.open({ ...ticketType })">
                <UiIcon class="edit-icon">edit_note</UiIcon> Anpassen
            </button>
        </div>
        <div class="tickettype-details-time">
            <p class="grayed-out">{{
                dayjs(ticketType.validFrom).format("DD.MM.YYYY H:mm") }} Uhr -</p>
            <p class="grayed-out">{{
                dayjs(ticketType.validTo).format("DD.MM.YYYY H:mm") }} Uhr</p>
        </div>
        <div class="tickettype-details-price">
            <p v-if="ticketType.price" class="grayed-out">
                {{ (ticketType.price / 100).toFixed(2) }}€
            </p>
        </div>
    </div>
    <EditTicketTypePopup ref="editTicketPopup" @update="updateTicketType()" />
</template>

<script setup lang="ts">
import { TicketType } from '~/classes/TicketType';
import dayjs from 'dayjs';
import EditTicketTypePopup from '@/components/popups/EditTicketTypePopup.vue';

const editTicketPopup = ref();
const emits = defineEmits(['update']);

const isValidDate = computed(() => {
    const now = new Date();
    const validFrom = new Date(currentTicket.ticketType.validFrom);
    const validTo = new Date(currentTicket.ticketType.validTo);
    return now >= validFrom && now <= validTo;
});

const currentTicket = defineProps<{
    ticketType: TicketType
}>()

function updateTicketType() {
    emits('update');
}
</script>

<style scoped>
.tickettype {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr auto;
    border-bottom: lightgray 1px solid;
    padding: 0.5rem 1rem;
}

.tickettype:hover {
    background-color: rgba(243, 242, 242, 0.744);
    border-left: var(--primary-color) 0.25rem solid;
    padding: 0.5rem 1rem 0.5rem 0.75rem;
}

.tickettype-name {
    padding-bottom: 0.3rem;
    font-size: 1.2rem;
}

.tickettype-details-price {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.tickettype-details-price p {
    align-self: flex-start;
    font-size: 1.0rem;
}

.tickettype-details-time {
    display: flex;
    flex-direction: column;
}

.edit-icon {
    margin-right: 0.7rem;
    color: white;
}

.edit-button {
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    font-weight: 500;
    padding: 0.2rem 0.7rem;
    color: #fff;
    background-color: var(--secondary-color);
    border: none;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.edit-button:hover {
    background-color: var(--secondary-color-dark);
}

.period {
    display: flex
}

.active,
.inactive {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 1rem;
    padding: 0.2rem 0.5rem;
    width: 100px;
}

.active {
    background-color: #08d20f;
}

.inactive {
    background-color: rgb(221, 218, 218);
}

.status {
    display: flex;
    justify-content: flex-start;
}
</style>