<template>
<template v-if="movies.length > 0">
  <div class="card" v-for="movie in movies" :key="movie.id" @click="$router.push({name: 'movie', params: {id: movie.id}})">
    <img :src="getImage(movie.poster_path)" :alt="movie.title">
    <div class="card__info">
        <span class="card__info-title">{{ movie.title }}</span>
        <span class="card__info-vote">{{ validatedVote(movie.vote_average) }}</span>
    </div>
    <div class="card__additional">
      <span class="card__additional-item"><strong>Описание: </strong> {{ sliceText(movie.overview) }}</span>
      <span class="card__additional-item"><strong>Дата релиза: </strong>{{ movie.release_date }}</span>
    </div>
  </div>
</template>
<span class="card__null" v-else>Фильмов нет</span>
</template>

<script>

export default {
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  setup () {
    const IMAGE_URL = 'http://image.tmdb.org/t/p/w500/'
    const MAX_TEXT_EL = 200

    const getImage = (url) => IMAGE_URL + url

    const sliceText = (text) => text ? text.slice(0, MAX_TEXT_EL) + '...' : 'нет данных'

    const standardizeRate = (rate) => rate.toFixed(1)

    const validatedVote = (vote) => vote ? standardizeRate(vote) : '-'

    return {
      getImage,
      sliceText,
      validatedVote
    }
  }
}
</script>
