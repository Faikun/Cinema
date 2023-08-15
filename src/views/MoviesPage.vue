<template>
  <h1 class="card__title">Список фильмов</h1>
  <cards-block
    :moviesData="moviesData"
    :totalPages="pages"
    @loadData="loadData"
    @emptyData = "emptyData"
  />
</template>

<script>
import { ref } from 'vue'
import { getMovie } from '@/api'
import CardsBlock from '@/components/CardsBlock.vue'
export default {
  components: { CardsBlock },
  setup () {
    const moviesData = ref([])
    const pages = ref(1)
    const loadData = async function (data) {
      data.loading.value = true
      const movieList = await getMovie(data.currentPage.value, data.movieType.value)
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
