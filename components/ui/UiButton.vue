<template>
  <button class="button" :class="{ reverse: reverse, loading: loading }">
    <div v-if="icon == 'logout' && !loading" class="icon-div">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon-style" viewBox="0 -960 960 960" fill="#FFFFFF">
        <path
          d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
      </svg>
    </div>
    <div v-if="icon == 'add_circle' && !loading" class="icon-div">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon-style" viewBox="0 -960 960 960" fill="#FFFFFF">
        <path
          d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
    </div>
    <div v-if="icon == 'navigate_next' && !loading" class="icon-div">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon-style-next" viewBox="0 -960 960 960" fill="#FFFFFF">
        <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
      </svg>
    </div>
    <div v-if="icon == 'list' && !loading" class="icon-div">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon-style" viewBox="0 -960 960 960" fill="#FFFFFF">
        <path
          d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
      </svg>
    </div>
    <div v-if="icon == 'close' && !loading" class="icon-div">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon-style" viewBox="0 -960 960 960" fill="#FFFFFF">
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </div>
    <LoadingIcon v-if="loading"></LoadingIcon>
    <slot />
  </button>
</template>

<script setup lang="ts">
import LoadingIcon from '~/components/LoadingIcon.vue';

defineProps({
  icon: String,
  reverse: Boolean,
  loading: {
    type: Boolean,
    default: false,
  }
})
</script>

<style scoped>
.button {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.25rem;
  padding: 0 0.5rem;
  height: 2rem;
  font-size: 1.1rem;
  background-color: #9c89b8;
  color: white;
  border-radius: 5px;
  border: none;
}

.button * {
  color: white;
  font-size: 1.1rem;
}

.reverse {
  flex-direction: row-reverse;
}

.loading {
  background-color: grey;
}

.icon-div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-style {
  width: 1.2rem;
  color: white;
}

.icon-style-next {
  width: 0.8rem;
  color: white;
}
</style>