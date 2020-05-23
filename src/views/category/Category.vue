<template>
  <div id="category">
    <NavBar class="nav-bar">
      <div slot="center">商品分类</div>
    </NavBar>
    <div class="content">
      <TabMenu 
        :categories="categories"
        @selectItem="selectItem"
      />
      <Scroll 
        id="tab-content" 
        ref="scroll"
        :data='[categoryData]'
        :probeType="3"
        @scroll='contentScroll'
      >
        <div>
          <TabContentCategory 
            :subcategories='showSubcategory'
          />
          <TabControl 
            :titles="['综合', '新品', '销量']"
            @tabClick='tabClick'
          />
          <TabContentDetail
            :categoryDetail='showCategoryDetail'
          />
        </div>
      </Scroll>
      <BackTop  
        class="back-top" 
        @click.native="backTop"
        v-show='isShowBackTop'
      />
    </div>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import TabMenu from './childComps/TabMenu'
import TabControl from 'content/tabControl/TabControl'
import TabContentCategory from './childComps/TabContentCategory'
import TabContentDetail from './childComps/TabContentDetail'
import Scroll from 'common/scroll/Scroll';
import BackTop from 'content/backTop/BackTop'


import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
import {itemListenerMixin, backTopMixin} from '@/common/mixin'



export default {
  name: 'Category',
  components: {
    NavBar,
    TabMenu,
    TabControl,
    TabContentCategory,
    TabContentDetail,
    Scroll,
    BackTop
  },
  data(){
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: 'pop',
    }
  },
  mixins: [itemListenerMixin,backTopMixin],
  created() {
    this._getCategory()
  },
  computed: {
    showSubcategory() {
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods: {
    _getCategory() {
      getCategory().then(res=>{
        //1. 获取分类数据
        this.categories = res.data.category.list
        //2. 初始化每个类别的子数据
        for(let i=0; i< this.categories.length; i++){
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        //3. 请求第一个分类的数据
        this._getSubcatecories(0)
      })
    },
    _getSubcatecories(index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(res=>{
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      // 2.发送请求，传入miniWallkey和Type
      getCategoryDetail(miniWallkey, type).then(res=>{
        // 3.保存数据
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
    },

    selectItem(index) {
      this._getSubcatecories(index)
    },

    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 800
    }
  }
}
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  position: relative;
  z-index: 999;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
  overflow: hidden;
}

#tab-content {
  height: 100%;
  flex: 1;
}

.back-top {
  position: fixed;
  bottom: 55px;
  right: 5px;
}
</style>