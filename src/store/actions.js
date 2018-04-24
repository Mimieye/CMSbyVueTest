import Vue from 'vue'
import mutations from './mutations'
// 引入 mutations_type （引用同一個 key）
import * as types from './mutations_type.js'

export const islogin = ({ commit }, userId) => {
	commit(types.ISLOGIN, userId)
}