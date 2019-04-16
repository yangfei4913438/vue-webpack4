<template>
  <div>
    <a-row class="app-record-line" v-for="item of $store.getters['home/getRecordList']" :key="item.id">
      <a-col :span="2" class="app-record-td">
        <font-awesome-icon style="color: gold" transform="shrink--8" :icon="item.icon"/>
      </a-col>
      <a-col :span="10" class="app-record-td">{{item.event}}</a-col>
      <a-col :span="4" class="app-record-td">{{item.type === 'income' ? `+${item.price}` : `-${item.price}` }}</a-col>
      <a-col :span="4" class="app-record-td">{{item.date}}</a-col>
      <a-col :span="4" class="app-record-td">
        <a-button type="primary" style="margin-right: 10px" @click="editBillDetail(item)">{{$t('btn.edit')}}</a-button>
        <a-button type="danger" @click="delBillRecord(item.id)">{{$t('btn.del')}}</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";
  export default {
    name: 'record_list',
    components: {ACol, ARow},
    methods: {
      delBillRecord (id) {
        // 开启加载动画
        this.$store.commit('home/setShowLoading', true);
        // 删除记录, 多个参数，使用对象的方式传递。
        this.$store.dispatch('home/delBillRecord', { axios: this.$axios, id })
      },
      editBillDetail (item) {
        // 编辑状态
        this.$store.commit('add/setIsEdit', true);
        // 更新类型
        this.$store.commit('add/setActiveKey', item.type);
        // 更新 cid
        this.$store.commit('add/setCategoriesID', item.cid);
        // 更新编辑对象
        this.$store.commit('add/setEditObj', item);
        // 跳转编辑页面
        this.$router.push('/add')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .app-record-line
    position: relative;
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #ccc;
    .app-record-td
      text-align: center;
</style>
