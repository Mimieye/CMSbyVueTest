import * as types from './mutations_type.js'
import Vue from 'vue'

export const state = {
	userId: '',
}


export const mutations = {
	[types.ISLOGIN] (state, userId) {
		state.userId = userId;
	},
}