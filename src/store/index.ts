import { createStore } from "vuex";
import createVuexAlong from "vuex-along";

export default createStore({
	state: {
		// 系统用户登录token，用于保存登录状态
		token: <string | null>null,
		//全局加载等待变量
		isLoad: false,
		// 工作台页面侧边导航缩放
		collapse: false,
		//导航栏目数据
		tagsList: [],
	},

	mutations: {
		setToken(state, data) {
			state.token = data;
		},
		//全局加载等待变量
		handleIsLoad(state, data) {
			state.isLoad = data;
		},
		handleCollapse(state, data) {
			state.collapse = data;
		},

		// 设置标签
		setTagsItem(state, data) {
			state.tagsList.push(data);
		},

		//清空标签
		clearTags(state) {
			state.tagsList = [];
		},

		closeTagsOther(state, data) {
			state.tagsList = data;
		},

		delTagsItem(state, data) {
			state.tagsList.splice(data.index, 1);
		},
	},

	plugins: [createVuexAlong()],
});
