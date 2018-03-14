/**
 * Created by Administrator on 2018/3/14.
 */

const index = resolve => {
	require(['@/components/index.vue'], resolve)
}

let router = [
	{
		path: '/',
		component: index
	}
]

export default router