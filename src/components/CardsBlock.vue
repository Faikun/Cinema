<template>
    <div class="cards" ref="cardsScroll">
      <card-list :movies="movies" />
      <loader-block v-if="loading" />
    </div>
</template>

<script>
import { onMounted, ref, watch, computed, onUnmounted } from 'vue'
import CardList from '@/components/CardList.vue'
import LoaderBlock from '@/components/LoaderBlock.vue'
import { useRoute } from 'vue-router'
import { useLanguage } from '@/store/loadLanguage'

export default {
  components: { CardList, LoaderBlock },
  props: {
    moviesData: {
      type: Array,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: {
    loadData: null,
    emptyData: null
  },
  setup (props, { emit }) {
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      loadData()
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const cardsScroll = ref(null)
    const route = useRoute()

    const movies = computed(() => props.moviesData)
    const loading = ref(false)
    const totalPages = computed(() => props.totalPages)
    const currentPage = ref(1)
    const movieType = computed(() => route.params.type)

    const store = useLanguage()
    const lang = computed(() => store.lang)

    const loadData = function () {
      emit('loadData', { currentPage, movieType, loading })
    }

    const handleScroll = function () {
      const el = cardsScroll.value
      if (parseInt(el.getBoundingClientRect().bottom) <= window.innerHeight && currentPage.value <= totalPages.value) {
        currentPage.value++
      }
    }

    watch(currentPage, () => {
      loadData()
    })

    watch(lang, () => {
      emit('emptyData')
      currentPage.value = 1
      loadData()
    })

    watch(route, () => {
      emit('emptyData')
      currentPage.value = 1
      loadData()
    })

    return {
      movies,
      currentPage,
      loading,
      cardsScroll
    }
  }
}
</script>
