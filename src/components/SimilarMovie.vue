<template>
    <div class="similar">
        <h2 class="similar__title">Похожие тайтлы:</h2>
        <div class="similar__wrapper">
            <card-list :movies="validateByVote"></card-list>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { getSimilarMovie } from '../api'
import { useLanguage } from '../store/loadLanguage'
import CardList from './CardList.vue'
import { useRoute } from 'vue-router'
export default {
  components: { CardList },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    onMounted(async () => {
      similarMovies.value = await getSimilarMovie(props.id)
    })

    const store = useLanguage()
    const route = useRoute()
    const lang = computed(() => store.lang)

    const similarMovies = ref([])

    const validateByVote = computed(() => similarMovies.value.filter(el => el.vote_average > 6 && el.vote_average < 10))

    watch(lang, async () => {
      similarMovies.value = await getSimilarMovie(props.id)
    })

    watch(route, async () => {
      similarMovies.value = await getSimilarMovie(props.id)
    })

    return {
      validateByVote
    }
  }
}
</script>
