<template>
    <header class="header">
        <div class="container">
            <div class="header__wrapper">
              <button class="header__menu" :class="[{'active': toggleVal}]" @click="toggleBurger">
                  <svg viewBox="0 0 64 48">
                      <path d="M19,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37"></path>
                      <path d="M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24"></path>
                      <path d="M45,33 L19,33 C-8,33 6,-2 22,14 L45,37"></path>
                  </svg>
              </button>
              <div class="header__logo">CINEMA</div>
              <nav class="nav" :class="[{'active': toggleVal}]">
                  <div
                      class="nav__item"
                      :class="[{active: movieType == movieTypes.popular}]"
                      @click="changeParams(movieTypes.popular)"
                  >Популярные</div>
                  <div
                      class="nav__item"
                      :class="[{active: movieType == movieTypes.top}]"
                      @click="changeParams(movieTypes.top)"
                  >ТОП</div>
                  <div
                      class="nav__item"
                      :class="[{active: movieType == movieTypes.new}]"
                      @click="changeParams(movieTypes.new)"
                  >Новые</div>
              </nav>
              <div class="header__right">
                <div class="header__search" @click="openSearch">
                    <input @click.stop :class="[{'active': toggleSearch}]" class="header__search-input" type="text" placeholder="Найти..." v-model="search" @keydown.enter="searchMovie">
                    <svg v-if="!toggleSearch" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">
                      <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                      <path d="M 7.7070312 6.2929688 L 6.2929688 7.7070312 L 23.585938 25 L 6.2929688 42.292969 L 7.7070312 43.707031 L 25 26.414062 L 42.292969 43.707031 L 43.707031 42.292969 L 26.414062 25 L 43.707031 7.7070312 L 42.292969 6.2929688 L 25 23.585938 L 7.7070312 6.2929688 z"></path>
                    </svg>
                  </div>
                <div class="header__lang">
                    <button :class="lang === 'ru-RU' ? 'blue' : 'darken-blue'" class="btn border blue" type="button" @click="changeLang('ru-RU')">RU</button>
                    <button :class="lang === 'en-US' ? 'blue' : 'darken-blue'" class="btn border blue" type="button" @click="changeLang('en-US')">EN</button>
                </div>
              </div>
            </div>
        </div>
    </header>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useLanguage } from '../store/loadLanguage'
export default {
  props: {
    isClicked: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    const store = useLanguage()
    const movieType = computed(() => route.params.type)

    const search = ref('')
    const toggleVal = ref(false)
    const toggleSearch = ref(false)

    const movieTypes = {
      popular: 'popular',
      top: 'top_rated',
      new: 'upcoming'
    }

    const changeParams = function (param) {
      if (movieType.value !== param) {
        router.replace({ name: 'movies', params: { type: param } })
        burgerToggleCheck()
      }
    }

    const burgerToggleCheck = function () {
      if (window.innerWidth <= 900) {
        toggleVal.value = false
      }
    }

    const searchMovie = function () {
      router.push({ name: 'search', params: { query: search.value } })
      search.value = ''
    }

    const changeLang = function (language) {
      store.changeLang(language)
    }

    const toggleBurger = function () {
      toggleVal.value = !toggleVal.value
    }

    const openSearch = function () {
      toggleSearch.value = !toggleSearch.value
    }

    const lang = computed(() => store.lang)

    watch(props, () => {
      burgerToggleCheck()
    })

    return {
      movieType,
      changeParams,
      movieTypes,
      search,
      searchMovie,
      changeLang,
      lang,
      toggleBurger,
      toggleVal,
      toggleSearch,
      openSearch
    }
  }
}
</script>
