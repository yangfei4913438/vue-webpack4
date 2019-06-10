import Vue from 'vue'
import SvgIcon from '../components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

/**
 * svg 使用范例
 *
 * <svg-icon icon-class="rrs" style="width: 14px; height: 14px"/>
 *
 * 注意：
 *
 * svg 中的样式要修改为
 *
 * <style>.cls-1{fill:"";}</style>
 *
 * 或者直接删掉这个 style 标签，否则颜色显示会有问题。
 *
 *
 * 还有就是，svg 文件只能放在 /src/icons/svg/ 目录下。否则需要你去修改 webpack 相关配置。如果不了解 webpack，请不要随意改动！！！
 *
 * */
