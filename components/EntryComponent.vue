<template>
<div class="entry-component" v-show="visible">
    <video id="video" v-show="running"></video>
    <div v-show="!running" class="result">
        <UiIcon class="success center-center" v-if="result">done</UiIcon>
        <UiButton class="scan center-center" @click="() => start()">Scan</UiButton>
    </div>
    <UiIcon class="entry-component__close" @click="() => hide()">close</UiIcon>
</div>
</template>

<script setup lang="ts">
import QrScanner from 'qr-scanner';
const visible = ref(false);

let scanner: QrScanner | undefined = undefined;
const running: Ref<boolean> = ref(false);
const result = ref(true);

onMounted(() => {
    scanner = new QrScanner(
        document.getElementById('video') as HTMLVideoElement,
        result => onDecode(result.data),
        { }
    );
});

function onDecode(content: string) {
    console.log(content);
    stop();
}

function show() {
    visible.value = true;
}

function hide() {
    visible.value = false;
    stop();
}

function start() {
    if(scanner) {
        scanner.start();
        running.value = true;
    }
}

function stop() {
    if(scanner) {
        scanner.stop();
        running.value = false;
    }
}

defineExpose({
    show, hide
});
</script>

<style scoped>
#video {
    position: absolute;
    width: 100%;
    height: 100%;
}
.entry-component {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    width: 100%;
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
.result {
    height: 100%;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
    padding: 1rem;
}
.scan {
    height: 100%;
    width: 100%;
    border-radius: 2rem;
    font-size: 3rem;
}
.success {
    background-color: #44d72a;
    border: 1rem solid #a9ff4cee;
    color: white;
    height: 8rem;
    width: 8rem;
    font-size: 4.5rem;
    border-radius: 4rem;
}
</style>