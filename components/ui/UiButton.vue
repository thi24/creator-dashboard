<template>
    <button class="button"><slot></slot></button>
</template>

<style scoped>
.button {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 0.5rem;
    height: 2rem;
    font-size: 1.1rem;
    background-color: #9c89b8;
    color: white;
    border-radius: 5px;
    border: none;
}
</style>