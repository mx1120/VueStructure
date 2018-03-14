import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
let routes = require('./routesMaker').default

export default new Router({
    mode:'history',
	routes
})
