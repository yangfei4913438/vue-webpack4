/**
 * 获取浏览器默认语言
 * 参数：无
 * 返回：小写的浏览器语言
 * */
function getLang () {
  let type = navigator.appName;
  let lang = '';
  if (type === 'Netscape') {
    lang = navigator.language // 获取浏览器配置语言，支持非IE浏览器
  } else {
    lang = navigator.userLanguage // 获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
  }
  // 异常处理, 某些浏览器, 中文语言的值是zh
  if (lang.toLowerCase() === 'zh') {
    return 'zh-cn'
  } else {
    return lang.toLowerCase()
  }
}

export default {
  getLang
}
