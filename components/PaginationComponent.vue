<template>
    <div class="center-center">
        <div class="paging center-center tile">
            <div class="paging__element center-center" :class="{ hide: current === 0 }" @click="() => before()">
                <UiIcon>navigate_before</UiIcon>
            </div>
            <div v-for="index in getRange(count)">
                <div v-if="index != null" class="paging__element center-center" :class="{ current: current === index }" @click="() => set(index)">
                    <p>{{ index + 1 }}</p>
                </div>
                <div v-if="index == null">
                    <p>...</p>
                </div>
            </div>
            <div class="paging__element center-center" :class="{ hide: current === count - 1 }" @click="() => next()">
                <UiIcon>navigate_next</UiIcon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    count: number,
    current: number
}>();
const emits = defineEmits<{
    ( e: 'set', payload: number): void
}>();

function next() {
    set(props.current + 1);
}

function before() {
    set(props.current - 1);
}

function set(value: number) {
    if(value >= 0 && value < props.count) {
        emits('set', value);
    }
}

function getRange(count: number) {
    const result: number[] = [];
    for(let i = 0; i < count; i++) {
        result.push(i);
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