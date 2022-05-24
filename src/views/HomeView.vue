<script setup lang="ts">
import {useThingStore} from "@/stores/thing";
import {storeToRefs} from "pinia";
import {defineComponent, reactive, ref} from "vue";

const {things, loading, error} = storeToRefs(useThingStore());

const {fetchThings, createThing, deleteThing} = useThingStore();
fetchThings();

let nameOfThing = ref("");

async function onClickDelete(id: string) {
  await deleteThing(id);
  await fetchThings();
}

async function onEnter() {
  await createThing(nameOfThing.value);
  await fetchThings();
}
</script>
<template>
  <main>
    <div class="my-8">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span class="text-gray-700">The Thing</span>
          <input
              @keyup.enter="onEnter()"
              v-model="nameOfThing"
              type="text"
              class="mt-1 block w-full"
              placeholder=""
          />
        </label>
      </div>
    </div>

    <p v-if="loading">Loading things...</p>
    <p v-if="error">{{ error.message }}</p>

    <div class="grid grid-cols-2 gap-4">
      <template v-for="thing in things" :key="thing.id">
        <div>{{ thing.name }}</div>
        <div>
          <button
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              @click="onClickDelete(thing.id)"
          >
            Delete
          </button>
        </div>
      </template>
    </div>
  </main>
</template>
