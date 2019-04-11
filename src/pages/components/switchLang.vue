<template>
  <a-radio-group v-model="lang" button-style="solid" @change="changeLang">
    <a-radio-button value="zh-cn">简体中文</a-radio-button>
    <a-radio-button value="zh-tw">繁體中文</a-radio-button>
    <a-radio-button value="en">English</a-radio-button>
  </a-radio-group>
</template>

<script>
  import moment from 'moment';
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import en from 'ant-design-vue/lib/locale-provider/en_US';
  import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW';
  // antd moment
  import 'moment/locale/en-au'
  import 'moment/locale/zh-cn';
  import 'moment/locale/zh-tw';
  export default {
    name: 'switchLang',
    data() {
      return {
        lang: null
      }
    },
    mounted() {
      // 获取当前系统中可能存在的语言设置
      let localLang = this.$tools.storage.getValue('lang');
      // 如果取不到值，就将浏览器语言赋值给它
      if (!localLang) {
        // 默认使用浏览器语言
        localLang = this.$tools.language.getLang();
        // 重新存储语言类型
        this.$tools.storage.setValue('lang', localLang)
      }
      // 初始化赋值。
      this.lang = localLang;
      // 设置 antd 插件语言
      this.setAntd(localLang);
    },
    methods: {
      changeLang (e) {
        // 重新存储语言类型
        this.$tools.storage.setValue('lang', e.target.value);
        // 网站国际化热更新
        this.$i18n.locale = e.target.value;
        // 设置 antd 插件语言
        this.setAntd(e.target.value)
      },
      setAntd (lang) {
        let ant_local;
        switch (lang) {
          case 'zh-cn':
            moment.locale('zh-cn'); // antd 中时间相关的语言设置
            ant_local = zhCN;
            break;
          case 'zh-tw':
            moment.locale('zh-tw');
            ant_local = zhTW;
            break;
          default:
            moment.locale('en-au'); // 找不到默认的，这里赋值一个澳大利亚的语言，肯定是英语。。。
            ant_local = en;
        }
        // 提交到父組件，設定顯示語言
        this.$emit('setLocale', ant_local);
      }
    }
  }
</script>
