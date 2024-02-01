import VirtualSeamlessScroll from "./VirtualSeamlessScroll/index.vue";

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;
  install.installed = true;
  Vue.component(VirtualSeamlessScroll.name, VirtualSeamlessScroll);
};

export default install;
export { VirtualSeamlessScroll };
