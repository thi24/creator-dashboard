<template>
    
<div class="form">
    <div>
    <input type="text" id="eventname" placeholder="Name" v-model="event.eventName">
    <input type="datetime-local" id="start-date" v-model="event.startsAt">
    <input type="datetime-local" id="end-date" v-model="event.endsAt">
    <input type="text" id="street" placeholder="street" v-model="event.address.street">
    <input type="text" id="city" placeholder="city" v-model="event.address.city">
    <input type="text" id="state" placeholder="state" v-model="event.address.state">
    <input type="text" id="zip" placeholder="zip" v-model="event.address.zip">
    <input type="text" id="description" placeholder="Beschreibung" v-model="event.description">
    <button type="button" @click="save">Erstellen</button>
    </div>
    
</div>

</template>


<script lang="ts" setup>
import { Event } from '@/classes/Event'
import { saveEvent } from '@/requests/event'

const event: Ref<Event> = ref(new Event());

function save() {
    let onSuccess = () => {
        console.log("Gespeichert");
    }

    let onError = () => {
        console.log("Fehler")
    }

    saveEvent(event.value, onSuccess, onError)
}
</script>


<style scoped>

.form  {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 50%;
    height: 50%;
}
</style>