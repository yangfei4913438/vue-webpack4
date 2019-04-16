export default {
  // 启用命名空间, 如果不启用，那么提交的时候，可以随意指定任意子模块中的对象，不利于后期维护。
  // 因为这个对象是哪个子模块中的，会一头雾水。所以，为了后期维护，非常有必要开启命名空间!
  namespaced: true,
  // 数据
  state: {
    activeKey: 'income', // 标签页显示哪个标签，income && expense
    categories_id: -1, // 选中的图标 ID
    categories: [], // 账单记录中的图标列表
    isEdit: false, // 是否为编辑状态，默认是新增对象
    edit_obj: null // 编辑对象
  },
  // 同步操作, mutations 有一个自带参数 state
  mutations: {
    setActiveKey (state, activeKey) {
      state.activeKey = activeKey
    },
    setCategoriesID (state, categories_id) {
      state.categories_id = categories_id
    },
    setCategories (state, categories) {
      state.categories = categories
    },
    setIsEdit (state, isEdit) {
      state.isEdit = isEdit
    },
    setEditObj (state, edit_obj) {
      state.edit_obj = edit_obj
    },
    clearEdit (state) {
      state.isEdit = false;
      state.categories_id = -1;
      state.edit_obj = null;
    }
  },
  // 异步操作, actions 有一个自带参数 store, 包含了所有的对象，具体可以打印查看。
  actions:{
    async updateEdit (store, {rootStore, axios, item}) {
      await axios.put('/api/v1/list/'+item.id, item);
      // 先操作同步
      store.commit('clearEdit');
      // 再操作异步
      rootStore.dispatch('home/getBillDetail', axios);
    },
    async addItem (store, {rootStore, axios, item}) {
      // 提交数据
      await axios.post('/api/v1/list', item);
      // 获取新的列表
      rootStore.dispatch('home/getBillDetail', axios);
    }
  },
  // 数据加工。getters 有两个自带参数，一个是 state, 一个是自身这个对象。
  // 通过返回函数的形式，外层可以传参进来。
  getters:{
    getCategories: (state, getters) => (tools, num) => {
      return tools.array.split_array(state.categories, num)
    }
  }
}
