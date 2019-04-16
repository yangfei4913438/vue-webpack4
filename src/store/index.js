import vue from 'vue'
import vuex from 'vuex'
import Home from '../pages/home/store'
import Add from '../pages/add/store'

vue.use(vuex);

export default new vuex.Store({
  modules: {
    home: Home, // 小写的模块名，方便引用
    add: Add
  }
});
