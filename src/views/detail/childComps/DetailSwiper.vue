<template>
  <Swiper class="swiper-wrap">
    <SwiperItem 
      v-for="item in topImages"
      :key="item"
    >
      <img :src="item" alt="">
    </SwiperItem>
  </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'common/swiper'
export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.swiper-wrap{
  height: 300px;
  overflow: hidden;
}
</style>