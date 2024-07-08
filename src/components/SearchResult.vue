<script setup lang="ts">
import { defineProps } from 'vue'
import { Requirement } from '../interfaces/Requirement'

const props = defineProps<{
  searchData: Requirement
}>()
</script>

<template>
  <div class="flex-1">
    <h1 class="title-font text-lg font-medium text-gray-900 mb-2">
      Work item details:
    </h1>
    <div
      class="h-102 bg-gray-100 rounded border border-gray-300 p-4 overflow-y-auto break-words"
    >
      <!-- First div with scrollable content -->
      <h3 class="title-font text-base font-medium text-gray-900 mb-3">Type:</h3>
      <h1 class="title-font text-gray-900 mb-3">
        {{ props.searchData.fields['System.WorkItemType'] }}
      </h1>
      <h3 class="title-font text-base font-medium text-gray-900 mb-3">
        Title:
      </h3>
      <h1 class="title-font text-gray-900 mb-3">
        {{ props.searchData.fields['System.Title'] }}
      </h1>
      <h3 class="title-font text-base font-medium text-gray-900 mb-3">
        Description:
      </h3>
      <span v-html="searchData.fields['System.Description']"></span>
    </div>
  </div>
</template>

<style scoped>
.h-102 {
  height: 32rem;
}
</style>
