<template>
  <h1 class="card__title">Поиск...</h1>
  <h2 class="card__subtitle">Результаты по запросу: {{ $route.params.query }}</h2>
  <cards-block
    :moviesData="moviesData"
    :totalPages="pages"
    @loadData="loadData"
    @emptyData = "emptyData"
  />
</template>

<script>
import { ref } from 'vue'
import { searchMovie } from '@/api'
import CardsBlock from '@/components/CardsBlock.vue'
import { useRoute } from 'vue-router'
export default {
  components: { CardsBlock },
  setup () {
    const moviesData = ref([])
    const pages = ref(1)
    const route = useRoute()
    const loadData = async function (data) {
      data.loading.value = true
      const movieList = await searchMovie(data.currentPage.value, route.params.query)
      console.log(movieList)
      const results = movieList.results
      moviesData.value.push(...results)
      pages.value = movieList.total_pages
      data.loading.value = false
    }
    const emptyData = function () {
      moviesData.value = []
    }
    return {
      moviesData,
      loadData,
      emptyData,
      pages
    }
  }
}
</script>
