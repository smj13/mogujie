<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <MainTabBar/>
    <Icon />
    <SvgIcon />
  </div>
</template>

<script>
import MainTabBar from 'content/mainTabbar/MainTabBar';
import Icon from 'content/Icon/Icon'
import SvgIcon from 'content/Icon/svg'
export default {
  name: 'App',
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  }
}
</script>

<style>
@import 'assets/css/base.css';
#app {
  height: 100%;
}
</style>
