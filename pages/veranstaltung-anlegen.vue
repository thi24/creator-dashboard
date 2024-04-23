<template>
    <div class="page">
        <div class="narrow">
            <h1 class="heading">Veranstaltung anlegen</h1>
            <div class="form tile">
                <div class="event-info">
                    <UiInput label="Eventname">
                        <input type="text" id="eventname" v-model="event.eventName" required>
                    </UiInput>
                    <div class="col-2">
                        <UiInput label="Start des Events">
                            <input type="datetime-local" id="start-date" v-model="event.startsAt" required>
                        </UiInput>
                        <UiInput label="Ende des Events">
                            <input type="datetime-local" id="end-date" v-model="event.endsAt" required>
                        </UiInput>
                    </div>
                    <UiInput label="Straße">
                        <input type="text" id="street" v-model="event.address.street" required>
                    </UiInput>
                    <div class="city-wrapper">
                        <UiInput label="PLZ">
                            <input type="text" id="zip" v-model="event.address.zip" required>
                        </UiInput>
                        <UiInput label="Stadt">
                            <input type="text" id="city" v-model="event.address.city" required>
                        </UiInput>
                    </div>
                    <UiInput label="Land">
                        <input type="text" id="state" v-model="event.address.state" required>
                    </UiInput>
                    <UiInput label="Bild hochladen">
                        <input type="file" id="picture" @change="onFileChange($event)" accept="image/*" required>
                    </UiInput>
                </div>
                <div class="right-side">
                    <UiInput class="description-input" label="Beschreibung" required>
                        <textarea id="description" v-model="event.description"></textarea>
                    </UiInput>
                    <div class="preview-image-wrapper">
                        <img v-if="previewImage" class="preview-image" :src="previewImage" alt="Bildvorschau">
                    </div>
                </div>
            </div>
            <div v-if="errorMessage" class="error-wrapper">
                <p class="error-message">{{ errorMessage }}</p>
            </div>
            <UiButton @click="save" icon="add_circle" :reverse="true" :loading="loading" class="save-btn">Erstellen
            </UiButton>
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
const eventData = new FormData();
const previewImage: Ref<string> = ref("");
const errorMessage: Ref<string> = ref("");


function save() {
    // Check if all inputs are filled
    if (event.value.address.city == "") {
        errorMessage.value = "Bitte Stadt eingeben";
        return
    }
    if (event.value.address.state == "") {
        errorMessage.value = "Bitte Land eingeben";
        return
    }
    if (event.value.address.street == "") {
        errorMessage.value = "Bitte Straße eingeben";
        return
    }
    if (event.value.address.zip == "") {
        errorMessage.value = "Bitte Postleitzahl eingeben";
        return
    }
    if (event.value.description == "") {
        errorMessage.value = "Bitte Beschreibung eingeben";
        return
    }
    if (event.value.eventName == "") {
        errorMessage.value = "Bitte Eventname eingeben";
        return
    }

    const eventJSON = JSON.stringify(event.value)
    const eventBlob = new Blob([eventJSON], { type: 'application/json' })
    eventData.append("event", eventBlob)


    let onSuccess = (event: Event) => {
        loading.value = false;
        navigateTo("/event-dashboard/" + event.id)
    }

    let onError = () => {
        loading.value = false;
    }
    loading.value = true;
    saveEvent(eventData, onSuccess, onError);
}

function onFileChange(event: any) { //kein any 
    eventData.append('image', event.target.files[0]);

    let reader = new FileReader();

    // Lesen Sie die ausgewählte Datei als Data-URL
    reader.onload = (e) => {
        if (e.target != null) {
            previewImage.value = e.target.result as string;
        }
    }

    reader.readAsDataURL(event.target.files[0]);
}
</script>


<style scoped>
.heading {
    margin-bottom: 1rem;
}

.form {
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
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.description-input {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
}

#description {
    resize: none;
}

.right-side {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
}

.preview-image-wrapper {
    max-width: 100%;
    overflow: hidden;
    border: grey 2px solid;
    padding: 5px;
    position: relative;
}

.preview-image {
    width: 100%;
    height: 100%;
    object-fit: fill;
    position: absolute;
    top: 0;
    left: 0;
}

.error-wrapper {
    border: var(--primary-color) 2px solid;
    padding: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.error-message {
    size: 1rem
}
</style>