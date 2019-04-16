<template>
  <div>
    <div v-for="(item, idx) of $store.getters['add/getCategories'](this.$tools, 5)" :key="idx">
      <a-row class="icon-row" type="flex" justify="space-around" align="middle">
        <a-col :span="3" class="category-icon" v-for="item2 in item" :key="item2.id" @click="SelectCategory(item2.id)">
          <div :class="$store.state.add.categories_id === item2.id ? 'App-font-icon active' : 'App-font-icon normal'">
            <font-awesome-icon :icon="item2.icon" size="2x"/>
          </div>
          <div>{{item2.name}}</div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import ARow from "ant-design-vue/es/grid/Row";
  import ACol from "ant-design-vue/es/grid/Col";
  export default {
    name: 'categories',
    props: {},
    components: {ACol, ARow},
    methods: {
      SelectCategory (id) {
        this.$store.commit('add/setCategoriesID', id)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .icon-row
    position: relative;
    width: 100%;
    margin-bottom 10px
    text-align center
  .category-icon
    display flex
    flex-direction column
    justify-content center
    cursor: pointer;

  .active
    background: #2593fb;
  .normal
    background #cccccc
  .App-font-icon
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color #ffffff
    margin auto
    padding-top 12.5px
</style>
