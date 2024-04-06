<template>
<div class="page">  
 <div class="narrow">
    <h1 class="heading">Veranstaltung anlegen</h1>
      <div class="form tile">
        <div class="event-info">
            <UiInput label="Eventname">
                <input type="text" id="eventname" v-model="event.eventName">
            </UiInput>
            <div class="col-2">
                <UiInput label="Start des Events">
                    <input type="datetime-local" id="start-date" v-model="event.startsAt">
                </UiInput>
                <UiInput label="Ende des Events">
                    <input type="datetime-local" id="end-date" v-model="event.endsAt">
                </UiInput>
            </div>
            <UiInput label="Straße">
                <input type="text" id="street" v-model="event.address.street">
            </UiInput>
            <div class="city-wrapper">
                <UiInput label="PLZ">
                    <input type="text" id="zip" v-model="event.address.zip">
                </UiInput>
                <UiInput label="Stadt">
                    <input type="text" id="city" v-model="event.address.city">
                </UiInput>
            </div>
            <UiInput label="Land">
                <input type="text" id="state" v-model="event.address.state">
            </UiInput>
        </div>
        <div>
            <UiInput class="description-input" label="Beschreibung">
                <textarea id="description" v-model="event.description"></textarea>
            </UiInput>
        </div>
     </div>
     <UiButton @click="save" icon="add_circle" :reverse="true" :loading="loading" class="save-btn">Erstellen</UiButton>
    </div>
 </div>
 
</template>


<script lang="ts" setup>
import { Event } from '@/classes/Event'
import { saveEvent } from '@/requests/event'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '~/components/ui/UiInput.vue';

const loading: Ref<boolean> = ref(false);
const event: Ref<Event> = ref(new Event());

function save() {
    let onSuccess = () => {
        console.log("Gespeichert");
        loading.value = false;
    }

    let onError = () => {
        console.log("Fehler")
        loading.value = false;
    }
    loading.value = true;
    saveEvent(event.value, onSuccess, onError);
}
</script>


<style scoped>
.heading {
    margin-bottom: 1rem;
}
.form  {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
}

.city-wrapper {
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: 1rem;
}

.event-info {
    display:flex;
    flex-direction: column;
    gap: 0.5rem;
}

.description-input {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
}

#description {
    resize: vertical;
}

.save-btn {
    margin: 0 auto;
    margin-top: 1rem;
}

</style>