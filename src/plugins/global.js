/**
 * Created by Administrator on 2018/3/9.
 */
import axios from 'axios'
import loading from './../components/baseComponents/Loading.vue'
import store from './../stores'

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)



const baseConfig = {
	install: null
}

const Directive = {
	install: null
}

const loadingComponent = {
	install: null
}

const Filter = {
	install: null
}

baseConfig.install = (Vue, router) => {
	//axois不属于vue插件，需要在vue原型链上增加方法
	Vue.prototype.fetch = axios
	//对所有接口请求拦截添加token（与后台协商）
	axios.interceptors.request.use(config => {
		//对数据在请求值服务器前做一次处理
		/*..........*/
		return config
	})
	axios.interceptors.response.use(res => {
		//对返回数据在使用之前做一次处理
		/*............*/
		return res
	})

	//promise原型链新增finally方法，用于loading状态控制,或者自定义的异常捕获
	Promise.prototype.finally = callback => {
		let Pro = this.constructor
		return this.then(
			value => Pro.resolve(callback()).then(() => value),
			reason => Pro.resolve(callback()).then(() => { throw reason})
		)
	}

	//全局路由钩子
	router.beforeEach((to, from, next) => {
		/*
		* to下一个路由路径
		* from上一个路由路径
		* 需要调用next()生效
		*/
		/*全局过渡动画*/
		const toIndex = history.getItem(to.path)
		const fromIndex = history.getItem(from.path)
		if(toIndex){
			if(!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')){
				store.commit('COUNT_DIRECTION', {direction: 'forward'})
			}else {
				store.commit('COUNT_DIRECTION', {direction: 'reverse'})
			}
		}else {
			++historyCount
			history.setItem('count', historyCount)
			to.path !== '/' && history.setItem(to.path, historyCount)
			store.commit('COUNT_DIRECTION', {direction: 'forward'})
		}
		next()
	})
}

//自定义指令，一些页面可能需要一些自定的方法
Directive.install = Vue => {
// 注册一个全局自定义指令 `v-color`
	Vue.directive('BG', {
		//在指令与元素绑定时，生效一次
		bind(el, binding, vnode) {
			console.info(binding)
		},
		// 当被绑定的元素插入到 DOM 中时……
		inserted (el) {
			el.style.backgroundColor = '#8f2c99'
		},
		//节点更新调用
		update() {},
		//所在组件全部更新后调用
		componentUpdated() {},
		//在指令与元素接触绑定的时候生效一次
		unbind() {}
	})
}


//全局注册的组件，可以在任意组件中调用
loadingComponent.install = Vue => Vue.component('Loading', loading)

export { baseConfig, loadingComponent, Directive, Filter }