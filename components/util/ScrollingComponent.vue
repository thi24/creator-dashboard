<template>
    <div class="scrolling-component">
        <div class="scrolling-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.scrolling-component {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
.scrolling-component::-webkit-scrollbar {
  display: none;
}

.scrolling-content {
    position: absolute;
    width: 100%;
    padding: 1rem 2rem;
    min-height: 100%;
    display: grid;
    grid-template-rows: 1fr;
}
</style>