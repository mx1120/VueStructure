/**
 * Created by Administrator on 2018/3/9.
 */
const father = resolve => {
	require(['@/components/slot/father.vue'], resolve)
}

const child = resolve => {
	require(['@/components/slot/child.vue'], resolve)
}

const router = [
	{
		path: '/slotf',
		component: father
	},
	{
		path: '/slots',
		component: child
	}
]

export default router