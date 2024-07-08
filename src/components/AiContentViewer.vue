<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { marked } from 'marked'
//import { GeneratedData } from '../interfaces/GeneratedData'

const props = defineProps<{
  generatedData: string
}>()

const htmlContent = ref(marked(props.generatedData))
const aiGeneratedOutput = ref('')

watch(htmlContent, (newValue) => {
  aiGeneratedOutput.value += ` ${newValue}`
})
</script>

<template>
  <div class="flex-1">
    <h1 class="title-font text-lg font-medium text-gray-900 mb-2 ml-2">
      AI generated test cases:
    </h1>
    <div
      class="h-102 bg-gray-100 rounded border border-gray-300 p-4 overflow-y-auto break-words ml-2"
    >
      <!-- Second div with scrollable content -->
      <span v-html="aiGeneratedOutput"></span>
    </div>
  </div>
</template>

<style scoped>
.h-102 {
  height: 32rem;
}
</style>
