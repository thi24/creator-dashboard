<template>
    <div class="overlay center-center" @click="close" v-show="visible">
        <div class="popup tile" @click.stop>
            <div class="popup__header">
                <h2>{{ heading }}</h2>
                <UiButton icon="close" @click="close"></UiButton>
            </div>
            <div class="popup__body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import UiButton from '../ui/UiButton.vue';
const visible = ref(false);


function close() {
    visible.value = false;
}

function open() {
    visible.value = true;
}

defineProps({
    heading: String
})
defineExpose({
    close,
    open
})

</script>

<style scoped>
.overlay {
    background-color: rgba(0, 0, 0, 0.313);
    backdrop-filter: blur(0.1rem);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
}

.popup {
    width: min(100%, 700px);
}

.popup__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}
</style>