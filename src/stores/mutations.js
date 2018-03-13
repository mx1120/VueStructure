/**
 * Created by Administrator on 2018/3/11.
 */
import * as types from './mutation-types'

const mutations = {
	[types.USER_INFO](state, data) {
		state.userInfo = data
	},
	[types.COUNT_DIRECTION](state, payload) {
		state.direction = payload.direction
	}
}
export default mutations