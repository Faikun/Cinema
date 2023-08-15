<template>
  <header-block :isClicked="isClicked"></header-block>
  <div class="container" @click="isClicked = !isClicked">
    <router-view />
  </div>
</template>

<script>
import HeaderBlock from './components/HeaderBlock.vue'
import { ref } from 'vue'

export default {
  inheritAttrs: false,
  components: { HeaderBlock },
  setup () {
    const isClicked = ref(false)
    return {
      isClicked
    }
  }
}
</script>
