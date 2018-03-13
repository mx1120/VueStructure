/**
 * Created by Administrator on 2018/3/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getter'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
	strict: debug,
	plugins: debug ? [createLogger(), createPersistedState()] : []
})

export default store