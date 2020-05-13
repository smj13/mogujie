<template>
  <div id="detail">
    <DetailNavBar 
    class="detail-nav" 
    @titleClick="titleClick"
    ref="nav"
    />
    <Scroll 
    class="content" 
    ref="scroll" 
    :probeType='3'
    @scroll="contentScroll">
      <DetailSwiper :topImages='topImages'/>
      <DetailBaseInfo :goods='goods'/>
      <DetailShopInfo :shop='shop' />
      <DetailGoodsInfo :detailInfo='detailInfo' @imgLoad='imgLoad'/>
      <DetailParamInfo :paramInfo='paramInfo' ref="params" />
      <DetailCommentInfo :commentInfo='commentInfo' ref="comment" />
      <GoodsList :goods='recommends' ref="recommend"/>
    </Scroll>
    <BackTop  
      class="back-top" 
      @click.native="backTop"
      v-show='isShowBackTop'
    />
    <DetailBottomBar @addToCart="addToCart" :countNub="this.$store.getters.cartList.length"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from 'content/goods/GoodsList'
import BackTop from 'content/backTop/BackTop'

import Scroll from 'common/scroll/Scroll'

import {getDetail,getRecommend, GoodsInfo, ShopInfo, GoodsParam} from 'network/detail'
import {itemListenerMixin} from '@/common/mixin'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false
    }
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid
    // 根据iid请求详细数据
    getDetail(this.iid).then(res => {
      // 获取顶部轮播图
      // console.log(res)
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 获取商品信息
      this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

      // 获取店铺信息
      this.shop = new ShopInfo(data.shopInfo)

      // 保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 获取商品参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 获取商品评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // this.$nextTick(()=>{
      //   // dom渲染完成
      //   // 图片仍然没加载完
      //   // this.themeTopYs = []
      //   // this.themeTopYs.push(0)
      //   // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   // console.log(this.themeTopYs)
      // })
    })

    // 请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
    })
  },
  mounted() {
    
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position) {
      // console.log(position)
      // 判断backTop是否显示
      this.isShowBackTop = (-position.y) > 800
      // 获取Y值
      const positionY = -position.y
      let length = this.themeTopYs.length
      // 和主体的值进行对比
      for(let i = 0; i < length-1; i++) {
        // if(this.currentIndex !== i &&
        //   ((i < length - 1 
        //   && positionY >= this.themeTopYs[i] 
        //   && positionY < this.themeTopYs[i+1]) 
        //   || (i === length - 1 
        //   && positionY >= this.themeTopYs[i]))){
        //   this.currentIndex = i
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    backTop() {
      this.$refs.scroll.scrollTo(0,0)
    },
    addToCart() {
      // 获取购物车需要的商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 将商品添加到购物车界面
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product).then(res => {
        // this.isShow = true;
        // this.message = res

        // setTimeout(()=>{
        //   this.isShow = false
        //   this.message = ''
        // },1000)
        this.$toast.show(res,2000)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 9;
}

.content {
  height: calc(100% - 93px);
  /* overflow: hidden; */
}

.back-top {
  position: fixed;
  bottom: 55px;
  right: 5px;
}
</style>