<!-- eslint-disable prefer-const -->
<template>
    <div class="info">
        <div class="info__block">
            <h2 class="info__block-title">{{ cinemaInfo.title }}</h2>
            <div class="info__block-additional"><strong>Статус:</strong> {{ cinemaInfo.status }}</div>
            <div class="info__block-additional"><strong>Средняя оценка:</strong> {{ cinemaInfo.vote_average }}</div>
            <div class="info__block-additional"><strong>Дата релиза:</strong> {{ cinemaInfo.release_date }}</div>
            <div class="info__block-additional"><strong>Описание:</strong> {{ cinemaInfo.overview }}</div>
        </div>
        <iframe class="info__video" :src="getVideoUrl" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>

    <similar-movie
      :id="id"
    />
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getMovieVideo, getMovieInfo } from '../api'
import { useLanguage } from '../store/loadLanguage'
import SimilarMovie from '@/components/SimilarMovie.vue'
export default {
  components: { SimilarMovie },
  setup () {
    const route = useRoute()
    const id = computed(() => route.params.id)
    const cinameVideo = ref({})
    const cinemaInfo = ref({})

    const store = useLanguage()
    const lang = computed(() => store.lang)

    watch(lang, async () => {
      cinemaInfo.value = await getMovieInfo(id.value)
      cinameVideo.value = await getMovieVideo(id.value)
    })

    watch(route, async () => {
      document.documentElement.scrollTop = 0
      cinemaInfo.value = await getMovieInfo(id.value)
      cinameVideo.value = await getMovieVideo(id.value)
    })

    onMounted(async () => {
      cinameVideo.value = await getMovieVideo(id.value)
      cinemaInfo.value = await getMovieInfo(id.value)
    })
    const getVideoUrl = computed(() => 'https://www.youtube.com/embed/' + cinameVideo.value?.key)

    return {
      getVideoUrl,
      cinemaInfo,
      id
    }
  }
}
</script>
