import { createStore } from "vuex";
import { sysUser } from "../model";
import createVuexAlong from "vuex-along";

export default createStore({
	state: {
		// 系统用户登录token，用于保存登录状态
		token: {
			id: <string | undefined>undefined,
			name: <string | undefined>undefined,
		},
		//全局加载等待变量
		isLoad: false,
		collapse: false,
	},

	mutations: {
		HandleToken(state, data: sysUser) {
			state.token.id = data.id;
			state.token.name = data.sysname;
		},
		//全局加载等待变量
		handleIsLoad(state, data) {
			state.isLoad = data;
		},
		handleCollapse(state, data) {
			state.collapse = data;
		},
	},

	plugins: [
		createVuexAlong({
			name: "csclib-vuex",
			local: false,
		}),
	],
});
