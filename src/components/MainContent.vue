<script setup lang="ts">
import { ref } from 'vue'
import Search from './Search.vue'
import SearchResult from './SearchResult.vue'
import AiContentViewer from './AiContentViewer.vue'
import UseCase from './UseCase.vue'
import { Requirement } from '../interfaces/Requirement'

const searchData = ref<Requirement>()
const generatedData = ref('')

// Event handler function to receive data from Search component
const handleSearchData = (data: any) => {
  searchData.value = data
}

// Event handler function to receive data from UseCase component
const handleGeneratedData = (data: any) => {
  generatedData.value = data
  console.log(generatedData.value)
}
</script>

<template>
  <main class="container mx-auto">
    <Search @searchData="handleSearchData" />
    <div class="flex items-center justify-between px-4">
      <SearchResult v-if="searchData" :searchData="searchData" />
      <AiContentViewer v-if="generatedData" :generatedData="generatedData" />
    </div>
    <div class="flex justify-start px-4 py-2">
      <UseCase
        v-if="searchData"
        @generatedData="handleGeneratedData"
        :searchData="searchData"
        class="mr-2"
      />
    </div>
  </main>
</template>

<style scoped></style>
