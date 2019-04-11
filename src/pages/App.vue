<template>
  <a-locale-provider :locale="locale">
    <div class="app">
      <a-row class="app-header">
        <a-col :span="8" :offset="8" class="app-welcome">
          <img :src="logoUrl" class="app-welcome-logo" alt="logo"/>
          <div class="app-welcome-font">Welcome to Vue</div>
        </a-col>
        <a-col :span="5" class="app-header-lang">
          <switch-lang @setLocale="setLocale"/>
        </a-col>
      </a-row>
      <div class="app-content">
        <div class="loading" v-if="$store.state.home.showLoading">
          <vue-loading type="spiningDubbles" color="#4091F7" :size="{ width: '50px', height: '50px' }"/>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </a-locale-provider>
</template>

<script>
  import ARow from 'ant-design-vue/es/grid/Row';
  import ACol from 'ant-design-vue/es/grid/Col';
  import logo from '../assets/images/logo.png';
  import ARadioGroup from "ant-design-vue/es/radio/Group";
  import ARadioButton from "ant-design-vue/es/radio/RadioButton";
  import switchLang from './components/switchLang';
  import { VueLoading } from 'vue-loading-template';
  export default {
    name: 'App',
    components: {
      ARadioButton,
      ARadioGroup,
      ACol,
      ARow,
      switchLang,
      VueLoading
    },
    data () {
      return {
        locale: null,
        logoUrl: logo
      }
    },
    mounted () {
    },
    methods: {
      setLocale(locale) {
        this.locale = locale
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .app
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    min-width: 1220px
    min-height: 600px
    background: #cccccc
    box-sizing border-box
    overflow hidden
  .app-header
    position: absolute;
    top 0
    right 0
    left 0
    height: 110px;
    background-color: #282c34;
    box-sizing border-box
    overflow hidden
    .app-welcome
      position relative
      height 100%
      text-align center
      .app-welcome-logo
        animation App-logo-spin infinite 20s linear
        height 55px
        width 55px
        margin-top 10px
      .app-welcome-font
        font-size: 22px
        color: white
        margin-top 10px
    .app-header-lang
      position relative
      height 100%
      display flex
      flex-direction column-reverse
      text-align right
      padding-bottom 8px
  .app-content
    position: absolute;
    top 110px
    right 0
    left 0
    bottom 0
    padding-bottom 30px
    box-sizing border-box
    overflow hidden
    .loading
      z-index 999
      position fixed
      top 195px
      width 100%
      display flex
      justify-content center

  // logo 旋转动画
  @keyframes App-logo-spin
    from
      transform: rotate(0deg);
    to
      transform: rotate(360deg);
</style>
