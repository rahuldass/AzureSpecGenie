<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { Requirement } from '../interfaces/Requirement'
import AiService from '../services/aiService'
//import { GeneratedData } from '../interfaces/GeneratedData'

const props = defineProps<{
  searchData: Requirement
}>()
const loading = ref(false)
const error = ref<string | null>(null)

// Event that this component can emit
const emits = defineEmits(['generatedData'])

const generateUseCases = async () => {
  loading.value = true
  error.value = null

  const aiService = new AiService()
  await aiService
    .generateUseCase(props.searchData.fields['System.Description'])
    .then((useCase: any) => {
      console.log(1, useCase)
      emits('generatedData', useCase)
    })
    .catch((error: any) => {
      error.value = 'An error occurred while generating use cases.'
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <button
    class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
    @click="generateUseCases"
  >
    Generate Test cases
  </button>
</template>

<style scoped></style>
