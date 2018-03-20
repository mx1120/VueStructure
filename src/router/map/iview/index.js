/**
 * Created by Administrator on 2018/3/20.
 */
const index = resolve => {
	require(['@/components/iview/index.vue'], resolve)
}

const login = resolve => {
	require(['@/components/iview/login.vue'], resolve)
}

const router = [
	{
		name: 'iViewIndex',
		path: '/iview/index',
		component: index,
	},
	{
		name: 'iViewLogin',
		path: '/login',
		component: login
	}
]

export default router