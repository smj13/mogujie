<template>
  <!-- 导航 -->
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <!-- 商品列表 -->
    <CartList />
    <!-- 底部汇总 -->
    <CartBottomBar />
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: 'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartLength', 'cartList'])
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>