<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <CheckButton 
        class="check-all-btn" 
        :isChecked="isSelectAll"
        @click.native="checkAllClick"
      />
      <span class="check-all-text">全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="caclulate" @click="calcClick">
      去结算：({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "content/checkButton/CheckButton";

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.getters.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.getters.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.$store.getters.cartList.length === 0) return false
      return this.$store.getters.cartList.every(item => item.checked)
    },
    isNotSelect() {
      if(this.$store.getters.cartList.length === 0) return true
      return this.$store.getters.cartList.every(item => !item.checked)
    }
  },
  methods: {
    checkAllClick() {
      if (this.isSelectAll) {
        this.$store.getters.cartList.forEach(item => item.checked = false);
      } else {
        this.$store.getters.cartList.forEach(item => item.checked = true);
      }
    },
    calcClick() {
      if(this.isNotSelect) {
        this.$toast.show('请选择要结算的商品')
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  position: fixed;
  display: flex;
  width: 100%;
  height: 40px;
  bottom: 49px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}

.check-all {
  display: flex;
  align-items: center;
  height: 40px;
  width: 60px;
}

.check-all-btn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.check-all-text {
  line-height: 20px;
}

.total-price {
  margin-left: 25px;
  flex: 1;
}

.caclulate {
  width: 90px;
  background-color: orangered;
  color: #fff;
  text-align: center;
}
</style>