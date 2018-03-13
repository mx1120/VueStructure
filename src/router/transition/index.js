/**
 * Created by Administrator on 2018/3/13.
 */
const one = resolve => {
	require(['@/components/transition/one.vue'], resolve)
}

const two = resolve => {
	require(['@/components/transition/two.vue'], resolve)
}

const three = resolve => {
	require(['@/components/transition/three.vue'], resolve)
}

const router = [
	{
		path: '/trans_one',
		component: one
	},
	{
		path: '/trans_two',
		component: two,
	},
	{
		path: '/trans_three',
		component: three
	}
]

export default router