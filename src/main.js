import './set-public-path'
import Vue from 'vue'
import singleSpaVue from 'single-spa-vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/element-variables.scss'
import echarts from 'echarts'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import '@/icons' // icon
import '@/permission' // permission control
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// set ElementUI lang to zh-CN
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(echarts)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  const projectConfig = require('../project.json')
  if (!location.pathname.startsWith(projectConfig.path)) {
    const app = new Vue({
      el: '.subapp-container',
      router,
      store,
      i18n,
      render: h => h(App)
    })
    console.log(app)
  }
}

const app = singleSpaVue({
  Vue,
  appOptions: {
    el: '.subapp-container',
    router,
    store,
    i18n,
    render: h => h(App)
  }
})

export const bootstrap = app.bootstrap
export function mount(props) {
  // 将父应用注入的自定义配置信息，加载到自己的状态管理中
  store.dispatch('app/SetGlobalEventDistributor', props.globalEventDistributor)
  store.dispatch('app/SetStore', props.store)
  console.log('成功接收父应用注入的信息', props.store, props.globalEventDistributor)
  store.dispatch('settings/changeSetting', {
    key: 'header',
    value: false
  })
  store.dispatch('settings/changeSetting', {
    key: 'sidebar',
    value: false
  })
  // 创建 dom
  createRootElement()
  return app.mount(props)
}
export const unmount = app.unmount

// 创建 dom 挂载项目
function createRootElement() {
  let $el = document.querySelector('.subapp-container')
  if ($el) return $el
  $el = document.createElement('div')
  $el.classList.add('subapp-container')
  document.body.appendChild($el)
  return $el
}

export default app
