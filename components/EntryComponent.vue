<template>
<div class="entry-component" v-show="visible">
    <p>Test</p>
    <video id="video"></video>
    <div class="narrow">
        <h1>Einlass</h1>
    </div>
    <UiIcon class="entry-component__close" @click="() => hide()">close</UiIcon>
</div>
</template>

<script setup lang="ts">
import QrScanner from 'qr-scanner';
const visible = ref(false);

let scanner: QrScanner | undefined = undefined;

onMounted(() => {
    scanner = new QrScanner(
        document.getElementById('video') as HTMLVideoElement,
        result => onDecode(result.data),
        { }
    );
});

function onDecode(content: string) {
    console.log(content);
}

function show() {
    visible.value = true;
    start();
}

function hide() {
    visible.value = false;
    stop();
}

function start() {
    if(scanner) {
        scanner.start();
    }
}

function stop() {
    if(scanner) {
        scanner.stop();
    }
}

defineExpose({
    show, hide
});
</script>

<style scoped>
#video, .entry-component {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
}
.entry-component {
    background-color: var(--body-background-color);
}
.entry-component__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
}
</style>