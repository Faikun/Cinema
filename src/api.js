import { useLanguage } from './store/loadLanguage'
import { computed } from 'vue'

const store = useLanguage()
const lang = computed(() => store.lang)

const API_READ_ACCESS_TOKEN = 'WRITE HERE YOUR TOKEN'
const BASE_URL = 'https://api.themoviedb.org/3'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`
  }
}

export const getMovie = async function (page, type) {
  const data = await fetch(`${BASE_URL}/movie/${type}?language=${lang.value}&page=${page}`, options)
  const result = await data.json()
  const list = result
  return list
}

export const searchMovie = async function (page, queryString) {
  const query = `${BASE_URL}/search/movie?query=${queryString}&include_adult=true&language=${lang.value}&page=${page}`
  const data = await fetch(query, options)
  const result = await data.json()
  return result
}

export const getMovieVideo = async function (id) {
  const query = `${BASE_URL}/movie/${id}/videos?&language=en-US`
  const data = await fetch(query, options)
  const result = await data.json()
  return result.results.find(e => e.official === true && e.type === 'Trailer')
}

export const getMovieInfo = async function (id) {
  const query = `${BASE_URL}/movie/${id}?language=${lang.value}`
  const data = await fetch(query, options)
  return await data.json()
}

export const getSimilarMovie = async function (id) {
  const query = `${BASE_URL}/movie/${id}/similar?language=${lang.value}&page=1`
  const data = await fetch(query, options)
  const res = await data.json()
  return res.results
}
