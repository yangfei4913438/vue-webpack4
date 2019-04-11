import Vue from 'vue';
import VueI18n from 'vue-i18n';
import storage from '../tools/components/localStorage';
import language from '../tools/components/language';

// 导入语言定义文件
import cn from './zh-cn';
import tw from './zh-tw';
import en from './en';

// 使用i18n
Vue.use(VueI18n);

// 获取当前系统中可能存在的语言设置
let localLang = storage.getValue('lang');

// 如果取不到值，就临时赋值一个en
if (!localLang) {
  // 默认使用浏览器语言
  localLang = language.getLang();
  // 重新存储语言类型
  storage.setValue('lang', localLang)
}

// 新建一个 i18n 实例
const i18n = new VueI18n({
  locale: localLang,
  messages: {
    en: {
      ...en
    },
    'zh-cn': {
      ...cn
    },
    'zh-tw': {
      ...tw
    }
  }
});

// 导出 i18n
export {
  i18n
};
