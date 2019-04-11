export default {
  // 启用命名空间, 如果不启用，那么提交的时候，可以随意指定任意子模块中的对象，不利于后期维护。
  // 因为这个对象是哪个子模块中的，会一头雾水。所以，为了后期维护，非常有必要开启命名空间!
  namespaced: true,
  // 数据
  state: {
    showLoading: false, // 是否显示加载动画
    activeKey: 'list', // 标签页显示哪个标签，list && chart
    list: [], // 账单数据列表
    categories: [], // 账单记录中的图标列表
    choose_date: '' // 日期选项选中的月份
  },
  // 同步操作, mutations 有一个自带参数 state
  mutations: {
    setShowLoading (state, show) {
      state.showLoading = show
    },
    setActiveKey (state, activeKey) {
      state.activeKey = activeKey
    },
    setChooseDate (state, date) {
      state.choose_date = date
    },
    setList (state, list) {
      state.list = list
    },
    setCategories (state, categories) {
      state.categories = categories
    }
  },
  // 异步操作, actions 有一个自带参数 store, 包含了所有的对象，具体可以打印查看。
  actions:{
    /**
     * 初始化获取需要的数据
     * @param: axios 因为需要异步处理，所以直接把 this.$axios 传进来就行了，不推荐使用原始 js 文件导入的方式来调用。
     * */
    async getInitData (store, axios) {
      console.log(store);
      let [ list, categories ] = await Promise.all([
        // 账单列表
        axios.get('/api/v1/list?_sort=id&_order=desc'),
        // 图标列表
        axios.get('/api/v1/categories')
      ]);
      // 上面已经变成同步操作了，所以这里可以提交数据。
      store.commit('setList', list.data);
      store.commit('setCategories', categories.data);
      // 关闭加载动画。
      store.commit('setShowLoading', false);
    },
    /**
     * 获取最新的账单列表
     * @param: axios
     * */
    async getBillDetail (store, axios) {
      let { data } = await axios.get('/api/v1/list?_sort=id&_order=desc');
      store.commit('setList', data);
      store.commit('setShowLoading', false);
    },
    /**
     * 删除一条记录
     * */
    delBillRecord (store, { axios, id }) {
      axios.delete('/api/v1/list/'+id)
        .then(() => {
          store.dispatch('getBillDetail', axios)
        })
        .catch(err => {
          console.log(err);
          store.commit('setShowLoading', false);
        })
    }
  },
  // 数据加工。getters 有两个自带参数，一个是 state, 一个是自身这个对象。
  getters:{
    // 过滤账目列表数据
    getRecordList (state) {
      // 根据选定的日期过滤出要显示的账单列表
      return state.list.filter(o => o.date.includes(state.choose_date))
    },
    // 根据过滤好的账目列表，计算出收入金额
    getTotalIncome (state, getters) {
      let income = 0;
      getters.getRecordList.forEach(item => {
        if (item.type === 'income') {
          income += item.price
        }
      });
      return income
    },
    // 根据过滤好的账目列表，计算出支出金额
    getTotalExpense (state, getters) {
      let expense = 0;
      getters.getRecordList.forEach(item => {
        if (item.type === 'expense') {
          expense += item.price
        }
      });
      return expense
    }
  }
}
