import { createStore } from "vuex";
import createVuexAlong from "vuex-along";
import { sysuser } from "../model";

export default createStore({
	state: {
		// 系统用户登录token，用于保存登录状态
		id: <string | null>null,
		name: <string | null>null,
		roleid: <number | null>null,

		//全局加载等待变量
		isLoad: false,
		collapse: false,
	},

	mutations: {
		HandleToken(state, data: sysuser) {
			state.id = data.id;
			state.name = data.sysname;
			state.roleid = data.roleid;
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
			justSession: true,
		}),
	],
});
