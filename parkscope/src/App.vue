<template>
  <div>
    <button @click="sendRequest">Отправить запрос</button>
    <p v-if="responseData">Ответ от сервера: {{ responseData }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const responseData = ref(null)

// Получание количества парковочных мест
const sendRequest = async () => {
  try {
    const response = await axios.get('http://26.119.66.245:3000/send-camera', {
      params: {
        id: 1,
      },
    })
    responseData.value = response.data
  } catch (error) {
    console.error('Ошибка запроса:', error)
    responseData.value = 'Произошла ошибка при запросе.'
  }
}
</script>
