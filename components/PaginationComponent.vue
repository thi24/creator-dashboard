<template>
    <div class="center-center">
        <div class="paging center-center tile">
            <div class="paging__element center-center" @click="() => before()">
                <UiIcon>navigate_before</UiIcon>
            </div>
            <div v-for="index in getRange(count)" class="paging__element center-center" :class="{ current: current === index }" @click="() => set(index)">
                <p>{{ index }}</p>
            </div>
            <div class="paging__element center-center" @click="() => next()">
                <UiIcon>navigate_next</UiIcon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    count: number
}>();
const emits = defineEmits<{
    ( e: 'set', payload: number): void
}>();

const current = ref(1);

function next() {
    if(current.value < props.count) {
        set(1);
    }
}

function before() {
    if(current.value > 1) {
        set(-1);
    }
}

function set(value: number) {
    if(value > 0 && value <= props.count) {
        current.value = value;
        emits('set', value - 1);
    }
}

function getRange(count: number) {
    const result: number[] = [];
    for(let i = 0; i < count; i++) {
        result.push(i + 1);
    }
    return result;
}
</script>

<style scoped>
.paging {
    padding: 0.5rem;
}
.paging__element {
    height: 2rem;
    width: 2rem;
    border-radius: 1rem;
    border: 2px solid black;
    cursor: pointer;
    user-select: none;
}
.paging__element.current {
    background-color: var(--secondary-color);
    border: 0;
}
.paging__element.current * {
    color: white;
}
</style>