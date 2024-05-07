<template>
    <div class="event">
        <div class="thumbnail-container center-center">
            <img v-if="thumbnail" class="event__image" :src="thumbnail" alt="">
            <LoadingComponent :loading="!thumbnail"></LoadingComponent>
        </div>

        <div class="event__body">
            <h3 class="event__heading">{{ event.eventName }}</h3>
            <p class="event__description">{{ event.description }}</p>
            <UiButton class="event__view" @click="() => useRouter().push('/event-dashboard/' + event.id)"
                icon="navigate_next" :reverse="true">Ansehen</UiButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import type { Event } from '~/classes/Event';
import { getImageForEvent } from '~/requests/event';
import LoadingComponent from '../util/LoadingComponent.vue';

const thumbnail = ref<string | undefined>(undefined);

function _getImageForEvent() {
    console.log("Getting image for event");
    console.log(props.event.id);
    let onSucess = (image: string) => {
        if (image == null || image == '') {
            onError();
        } else {
            thumbnail.value = "data:image/jpg;base64," + image;
        }
    }
    let onError = () => {
        thumbnail.value = "http://www.crogastudiobuilds.com/wp-content/uploads/2019/12/placeholder-16-9-26571_1080x675.jpg"
    }
    getImageForEvent(props.event.id, onSucess, onError);
}

onMounted(() => {
    _getImageForEvent();
})

const props = defineProps<{
    event: Event
}>()
</script>

<style scoped>
.event {
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    display: grid;
    grid-template-rows: auto 1fr;
}

.event__image {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
}

.thumbnail-container {
    width: 100%;
    aspect-ratio: 16/9;
}

.event__body {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.25rem;
}

.event__view {
    align-self: center;
}

.event__description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>