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
}

.scrolling-content {
    position: absolute;
    width: 100%;

}
</style>