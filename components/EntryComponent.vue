<template>
<div class="entry-component" v-show="visible">
    <div id="video-wrapper" v-show="status === ScanningStatus.SCANNING">
        <!-- Video Element will appear here -->
    </div>
    <div v-if="status === ScanningStatus.SUCCESS || status === ScanningStatus.ERROR || status === ScanningStatus.DEFAULT" class="result">
        <UiIcon class="success center-center" v-if="status === ScanningStatus.SUCCESS">done</UiIcon>
        <UiIcon class="error center-center" v-if="status === ScanningStatus.ERROR">close</UiIcon>
        <UiButton class="scan center-center" @click="() => start()">Scan</UiButton>
    </div>
    <div class="result" v-if="status === ScanningStatus.LOADING">
        <LoadingComponent :loading="true"></LoadingComponent>
    </div>
    <UiIcon class="entry-component__close" @click="() => hide()">close</UiIcon>
</div>
</template>

<script setup lang="ts">
import QrScanner from 'qr-scanner';
import LoadingComponent from './util/LoadingComponent.vue';
import { redeemTicket } from '~/requests/ticket';
const visible = ref(false);

enum ScanningStatus {
    DEFAULT,
    SCANNING,
    LOADING,
    SUCCESS,
    ERROR
}

let scanner: QrScanner | undefined = undefined;
const status: Ref<ScanningStatus> = ref(ScanningStatus.DEFAULT);

function onDecode(content: string) {
    stop();
    console.log(content);
    status.value = ScanningStatus.LOADING;
    redeemTicket(content, () => {
        status.value = ScanningStatus.SUCCESS;
    }, () => {
        status.value = ScanningStatus.ERROR;
    });
}

function show() {
    status.value = ScanningStatus.DEFAULT;
    visible.value = true;
}

function hide() {
    visible.value = false;
    stop();
}

function start() {
    const videoWrapper = document.getElementById('video-wrapper');
    if(videoWrapper) {
        const videoElement = document.createElement('video');
        videoElement.id = 'video';
        videoWrapper.appendChild(videoElement);
        scanner = new QrScanner(
            videoElement as HTMLVideoElement,
            result => onDecode(result.data),
            {}
        );
        scanner.start();
        status.value = ScanningStatus.SCANNING;
    }
}

function stop() {
    if(scanner) {
        scanner.stop();
        ScanningStatus.LOADING;
        const videoWrapper = document.getElementById('video-wrapper');
        if(videoWrapper) {
            videoWrapper.replaceChildren();
        }
    }
}

defineExpose({
    show, hide
});
</script>

<style>
#video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>

<style scoped>
#video-wrapper, .result {
    height: 100%;
    width: 100%;
    position: absolute;
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
    background-color: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
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
.success, .error {
    color: white;
    height: 8rem;
    width: 8rem;
    font-size: 4.5rem;
    border-radius: 4rem;
}

.success {
    background-color: #44d72a;
    border: 1rem solid #a9ff4cee;
}

.error {
    background-color: #bd1104;
    border: 1rem solid #d45906ee;
}
</style>