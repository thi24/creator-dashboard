<template>
  <div class="center-center">
    <div class="paging center-center tile">
      <div class="paging__element center-center" :class="{ hide: current === 0 }" @click="() => start()">
        <UiIcon>keyboard_double_arrow_left</UiIcon>
      </div>
      <div class="paging__element center-center" :class="{ hide: current === 0 }" @click="() => before(current)">
        <UiIcon>navigate_before</UiIcon>
      </div>
      <div class="paging__element center-center">
        <p>{{ current + 1 }}</p>
      </div>
      <div class="paging__element center-center" :class="{ hide: current === count - 1 }" @click="() => next(current)">
        <UiIcon>navigate_next</UiIcon>
      </div>
      <div class="paging__element center-center" :class="{ hide: current === count - 1 }" @click="() => end()">
        <UiIcon>keyboard_double_arrow_right</UiIcon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  count: number,
  current: number,
  onChange: (page: number) => void
}>();

function next(page: number) {
  props.onChange(page + 1);
}

function before(page: number) {
  props.onChange(page - 1);
}

function start() {
  props.onChange(0);
}

function end() {
  props.onChange(props.count - 1);
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