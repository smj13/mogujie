<template>
  <div id="profile">
    <NavBar class="nav-bar">
      <div slot="center">用户信息</div>
    </NavBar>
    <Scroll class="content">
      <div>
        <UserInfo />
        <section class="account">
          <div class="account-item">
            <div class="number">
              <span class="balance">0.00</span>元
            </div>
            <div class="account-info">我的余额</div>
          </div>
          <div class="account-item">
            <div class="number">
              <span class="balance">0</span>个
            </div>
            <div class="account-info">我的优惠</div>
          </div>
          <div class="account-item">
            <div class="number">
              <span class="balance">0</span>分
            </div>
            <div class="account-info">我的积分</div>
          </div>
        </section>
        <ListView :listData="orderList"></ListView>

        <ListView :listData="serviceList"></ListView>
      </div>
    </Scroll>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import UserInfo from "./childComps/UserInfo";
import ListView from "./childComps/ListView";
import Scroll from "common/scroll/Scroll";

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    ListView,
    Scroll
  },
  data() {
    return {
      orderList: [
        { icon: "#order", iconColor: "#ff8198", info: "我的消息" },
        { icon: "#point", iconColor: "#fc7b53", info: "积分商城" },
        { icon: "#vip", iconColor: "#ffc636", info: "会员卡" }
      ],
      serviceList: [
        { icon: "#service", iconColor: "#ff8198", info: "我的购物车" },
        { icon: "#download", iconColor: "#ff8198", info: "下载购物APP" }
      ]
    };
  }
};
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
  overflow: hidden;
}

.nav-bar {
  position: relative;
  top: 0;
  z-index: 999;
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.account {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}

.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.account-info {
  margin-top: 6px;
}

.order-list,
.service-list {
  margin-top: 12px;
}
</style>