/**
 * Created by Administrator on 2018/3/14.
 */
const swiper = resolve => {
	require(['@/components/swiper/swiper.vue'], resolve)
}

const router = [
	{
		path: '/swiper',
		component: swiper,
		alias: '/sw'
	}
]

export default router