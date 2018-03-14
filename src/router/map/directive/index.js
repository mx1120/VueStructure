/**
 * Created by Administrator on 2018/3/9.
 */
const direc = resolve => {
	require(['@/components/Directive/Directive.vue'], resolve)
}

const router = [
	{
		path: '/direc',
		component: direc
	}
]

export default router