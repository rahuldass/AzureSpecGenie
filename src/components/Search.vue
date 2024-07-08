<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import axios from 'axios'
import { Requirement } from '../interfaces/Requirement'

const loading = ref(false)
const error = ref<string | null>(null)
const requirementId = ref<string>('')
const requirement = ref<Requirement | null>(null)

// Event that this component can emit
const emits = defineEmits(['searchData'])

// Search for a single requirement by its id
const searchRequirement = async () => {
  requirement.value = null
  loading.value = true
  error.value = null
  try {
    const apiUrl = `https://dev.azure.com/${
      import.meta.env.VITE_AZURE_DEVOPS_ORG
    }/${import.meta.env.VITE_AZURE_DEVOPS_PROJECT}/_apis/wit/workitems/${
      requirementId.value
    }?api-version=7.1`
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Basic ${btoa(
          ':' + import.meta.env.VITE_AZURE_DEVOPS_PAT
        )}`,
      },
    })
    if (response) {
      requirement.value = response.data
      emits('searchData', requirement.value)
    } else {
      error.value = `No requirement found with id ${requirementId.value}`
    }
  } catch (err) {
    error.value = `An error occurred while searching for the requirement with id ${requirementId.value}`
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-between px-4 py-2">
    <input
      v-model="requirementId"
      placeholder="Enter requirement id..."
      class="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      required
    />
    <button
      class="inline-flex text-white bg-indigo-500 border-0 ml-2 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
      @click="searchRequirement"
    >
      Search
    </button>
  </div>
  <div class="flex items-center justify-between px-4">
    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
  </div>
</template>

<style scoped></style>
