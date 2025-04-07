<template>
<div>
    <button @click="sendRequest">Отправить запрос</button>
    <p v-if="responseData">Ответ от сервера: {{ responseData }}</p>
    <button @click="getAllCameras">Получить камеры</button>

    <!-- Отображаем кнопки для каждой камеры -->
    <div v-if="carsCount > 0">
      <h3>Доступные камеры (всего: {{ carsCount }}):</h3>
      <button
        v-for="(camera, index) in responseData"
        :key="camera.camera_id"
        @click="selectCamera(camera)"
      >
        Камера {{ index + 1 }}: {{ camera.name }}
      </button>
    </div>
    <p v-else-if="responseData === 'Произошла ошибка при запросе.'">
      Нет данных о камерах
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const responseData = ref(null)
const carsCount = ref(null)

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

const getAllCameras = async () => {
  try {
    const response = await axios.get('http://26.119.66.245:3000/get_camera')

    responseData.value = response.data
    carsCount.value = response.data.length // Подсчитываем количество камер

    console.log(`Получено ${carsCount.value} камер`) // Для отладки
  } catch (error) {
    console.error('Ошибка запроса:', error)
    responseData.value = 'Произошла ошибка при запросе.'
    carsCount.value = 0 // Сбрасываем счетчик при ошибке
  }
}

</script>
