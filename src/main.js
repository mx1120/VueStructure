// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import Vuex from 'vuex'
import store from './stores'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import iView from 'iview'
import 'swiper/dist/css/swiper.css'
import 'iview/dist/styles/iview.css'
import locale from 'iview/dist/locale/en-US'
import { baseConfig, loadingComponent, Directive, Filter } from './until/global'


Vue.config.productionTip = false

//解决移动端手机点击30毫秒延迟
fastClick.attach(document.body)

//插件引用
Vue.use(Vuex)
Vue.use(iView, { locale })
Vue.use(VueLodash, lodash)
Vue.use(baseConfig, router)
/*swiper插件*/
Vue.use(VueAwesomeSwiper)
//懒加载
Vue.use(VueLazyload, {
	error: '/static/lazyload/error.png',
	loading: '/static/lazyload/loading.gif'
})

//全局注册组件
Vue.use(loadingComponent)
Vue.use(Directive)
Vue.use(Filter)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
	store,
    components: { App },
    template: '<App/>',
})

