<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl 
      :titles="['流行', '新款', '精选']"
      @tabClick='tabClick'
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <Scroll 
    class="content" 
    ref="scroll"
    :probeType="3"
    @scroll='contentScroll'
    :pullUpLoad="true"
    @pullingUp="loadMore"
    >
      <HomeSwiper 
      :banners='banners'
      @swiperImageLoad="swiperImageLoad"
      />
      <HomeRecommendView :recommends='recommends'/>
      <HomeFeatureView />
      <TabControl 
        :titles="['流行', '新款', '精选']"
        @tabClick='tabClick'
        ref="tabControl2"
      />
    <GoodList :goods="showGoods"/>
    </Scroll>
    <BackTop  
      class="back-top" 
      @click.native="backTop"
      v-show='isShowBackTop'
    />
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps/HomeFeatureView'
import TabControl from 'content/tabControl/TabControl'
import GoodList from 'content/goods/GoodsList'
import Scroll from 'common/scroll/Scroll'
import BackTop from 'content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {itemListenerMixin} from '@/common/mixin'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    // 1. 保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2. 取消全局事件的监听
    this.$bus.$off('itemIngLoad', this.itemImgListener)
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      // console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backTop() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      // 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 800
      // 绝对tabControl是否吸顶
      this.isTabFixed = (-position.y) >= this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      // console.log(this.$refs.tabControl.$el.offsetTop) 
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res.data);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res=>{
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
        this.$refs.scroll.refresh()
      })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  overflow: hidden;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  z-index: 999; 
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.back-top {
  position: fixed;
  bottom: 55px;
  right: 5px;
}
.tab-control { 
  position: relative;
  z-index: 888;
}
</style>