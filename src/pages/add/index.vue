<template>
  <div class="add">
    <a-tabs :activeKey="$store.state.add.activeKey" type="card" @change="changeCard">
      <a-tab-pane key="income">
        <span slot="tab">
          <font-awesome-icon :icon="['far','calendar-plus']" /> {{$t('label.income')}}
        </span>
      </a-tab-pane>
      <a-tab-pane key="expense">
        <span slot="tab">
          <font-awesome-icon :icon="['far','calendar-minus']" /> {{$t('label.expense')}}
        </span>
      </a-tab-pane>
    </a-tabs>
    <categories />
    <add-form />
  </div>
</template>

<script>
  import Categories from './components/categories'
  import AddForm from './components/addForm'
  export default {
    name: 'Add',
    components: {
      Categories,
      AddForm
    },
    methods: {
      changeCard (card) {
        // 同步操作，设置活动的标签页
        this.$store.commit('add/setActiveKey', card);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .add >>> .ant-tabs-tab
    width 200px
    text-align center
  .add
    position relative
    width 80%
    height 100%
    margin 0 auto
    padding 18px
    box-sizing border-box
    overflow-y scroll
    background: #ffffff;
    transition box-shadow .5s ease
    box-shadow: 0 0 8px 2px rgba(0,0,0,.15);
    border-bottom-left-radius 5px
    border-bottom-right-radius 5px
  .add:hover
    box-shadow: 0 8px 8px 8px rgba(0,0,0,.15);
</style>
