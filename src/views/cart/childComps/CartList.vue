<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <!-- <li v-for="(item,index) in cartList" :key="index">{{item}}</li> -->
      <CartListItem 
        v-for="(item,index) in cartList" 
        :key="index" 
        :product='item'
      />
    </Scroll>
  </div>
</template>

<script>
import Scroll from "common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 40px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>