<template>
  <div 
    class="toast" 
    v-show="isShow" 
    :class="{'fade-out': isfadeOut}"
  >
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // isShow: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: false,
      timer: null,
      isfadeOut: false
    }
  },
  methods: {
    show(message, duration=2000) {
      this.isfadeOut = false
      setTimeout(() => {
        clearTimeout(this.timer)
        this.isfadeOut = true
        this.isShow = true
        this.message = message
        this.timer = setTimeout(() => {
          this.isShow = false
          this.message = ''
          this.isfadeOut = false
        }, duration);
      }, 0);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  z-index: 999;
  background-color: rgba(0,0,0,.75);
  color: #fff;
}
.fade-out {
  animation: toOpacity 2s ease-in;
}
@keyframes toOpacity {
  0%{ opacity: .75; }
  100%{ opacity: 0; }
}
</style>