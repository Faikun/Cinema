import { defineStore } from 'pinia'

export const useLanguage = defineStore('lang', {
  state: () => ({ lang: 'ru-RU' }),
  actions: {
    changeLang (lang) {
      this.lang = lang
    }
  }
})
