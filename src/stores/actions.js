/**
 * Created by Administrator on 2018/3/11.
 */
//抛出方法，在方法内执行mutation，改变state状态值

import * as types from './mutation-types'

export const userInfoUp = async ({ dispatch, commit, state }, data) => {
	//dispatch可调用其他action方法
}

export const COUNT_DIRECTION = ({ commit, state }, payload) => {
	commit(types.COUNT_DIRECTION, payload)
}

export const SET_USERINFO = ({commit, state}, data) => {
	commit(types.USER_INFO, data)
}