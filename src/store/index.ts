import { createStore } from "vuex";
import { sysuser } from "../model";
import createVuexAlong from "vuex-along";

export default createStore({
	state: {
		// 系统用户登录token，用于保存登录状态
		token: {
			id: <string | null>null,
			name: <string | null>null,
			roleid: <number | null>null,
		},
		//全局加载等待变量
		isLoad: false,
		collapse: false,
	},

	mutations: {
		HandleToken(state, data: sysuser) {
			state.token.id = data.id;
			state.token.name = data.sysname;
			state.token.roleid = data.roleid;
		},
		//全局加载等待变量
		handleIsLoad(state, data) {
			state.isLoad = data;
		},
		handleCollapse(state, data) {
			state.collapse = data;
		},
	},

	plugins: [createVuexAlong({})],
});
