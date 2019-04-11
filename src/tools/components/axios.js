import axios from 'axios'
import { message } from 'ant-design-vue'
import { i18n } from '../../lang'

// 超时时间(30秒超时)
axios.defaults.timeout = 30000;

// 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    switch (error.response.status) {
      case 502:
        // 直接调用 i18n 的时候，t前面不要加$符号
        message.error(i18n.t('http_error.err502'), 5);
        break;
      case 404:
        message.error(i18n.t('http_error.err404'),5);
        break;
      default:
        // 自定义错误判定
        switch (error.response.data && error.response.data.errno) {
          // 服务内部错误
          case 100:
            message.error(i18n.t('http_error.err403'),5);
            break;
          // 鉴权失败
          case 101:
            message.error(i18n.t('http_error.err101'),5);
            break;
          // 未定义的错误
          default:
            message.error(i18n.t('http_error.err182'),5)
        }
    }
    return Promise.reject(error.response)
  }
);

export default axios
