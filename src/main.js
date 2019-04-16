import Vue from 'vue'
import App from './pages/App.vue'
import router from './router'
import { i18n } from './lang'
import tools from './tools'
import echarts from 'echarts'
import store from './store'
import { message, LocaleProvider, Row, Col, Radio, DatePicker, Tabs, Icon, Button, Form, Input, InputNumber } from 'ant-design-vue'

// 清空浏览器默认样式
import './assets/styles/reset.css'
// 避免某些情况下1像素边框变成多像素
import './assets/styles/border.css'

// 加载vue-fontawesome字体组件
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
library.add(fas, far, fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

// 批量注册组件
[ LocaleProvider, Row, Col, Radio, DatePicker, Tabs, Icon, Button, Form, Input, InputNumber ].map(item => Vue.use(item));

// antd 消息组件
Vue.prototype.$message = message;
// 工具组件
Vue.prototype.$tools = tools;
// axios
Vue.prototype.$axios = tools.axios;
// echarts
Vue.prototype.echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: { App },
  template: '<App/>'
});
