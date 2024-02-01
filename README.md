# virtual-seamless-scroll

## 安装
1. npm
    ```
    npm install virtual-seamless-scroll --save
    ```
2. Yarn
    ```
    yarn add virtual-seamless-scroll
    ```
## 组件配置
| 参数 | 说明                        | 类型 | 默认值  |
| --- |---------------------------| --- |------|
| list | 数据源                       | Array | []   |
| limitScrollNum | 开启滚动的数据量，只有列表长度大于等于该值才会滚动 | Number | 100  |
| intervalTime | 滚动间隔时间(ms,越小约快)           | Number | 300 |
| maxViewNum | 视图里最多显示的数据量(开启虚拟列表的阈值)    | Number | 20 |
| mouseenterStop | 鼠标移入是否停止滚动                | Boolean | true |
## 注意项
1. 该组件需要父元素设置宽高，否则无法正常滚动
2. limitScrollNum的值需要大于等于maxViewNum的值，否则无法正常滚动
3. 组件列表的每一项的高度需要一致，否则滚动会出现问题
## 使用
### 全局注册
```javascript
// **main.js**
  import { createApp } from 'vue';
  import App from './App.vue';
  import VirtualSeamlessScroll from 'virtual-seamless-scroll'
  const app = createApp(App);
  app.use(VirtualSeamlessScroll);
  app.mount('#app');
```
### 局部注册
```javascript
// **.vue**
  import { VirtualSeamlessScroll } from 'virtual-seamless-scroll'
  export default {
    components: {
      VirtualSeamlessScroll
    }
  }
```
