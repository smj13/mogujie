import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context, payload){
    return new Promise((resolve) => {
      // 新添加商品判断
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 判断oldProduct
      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('购物车中该商品数量+1')
      }else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('成功添加到购物车')
      }
    })
  }
}