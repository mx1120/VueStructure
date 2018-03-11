import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import slot from './slot/index'
import direc from './directive/index'

Vue.use(Router)

let routes = [
	{
		path: '/',
		name: 'HelloWorld',
		component: index
	}
]

routes = routes.concat(slot, direc)

export default new Router({
    mode:'history',
	routes
})
