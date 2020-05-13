import Toast from "./Toast";

const obj = {}

obj.install = function(Vue) {
  // document.body.appendChild(Toast.$el)
  // 1.创建组件构造器
  const toastConstrustor = Vue.extend(Toast)

  // 2.new方式，根据组件构造器创建组件对象 
  const toast = new toastConstrustor()

  // 3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el 对应的就是创建好的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj