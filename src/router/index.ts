import { debug } from "console";
import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Login",
		meta: { title: "系统登录" },
		component: () => import("../views/Login.vue"),
	},
	{
		path: "/workbench",
		name: "WorkBench",
		meta: { title: "系统首页" },
		component: () => import("../views/WorkBench.vue"),
		children: [
			{
				path: "/usermg",
				name: "UserManager",
				meta: { title: "用户管理" },
				component: () => import("../views/UserManager.vue"),
			},
			{
				path: "/certimg",
				name: "CertiManager",
				meta: { title: "证书管理" },
				component: () => import("../views/CertiManager.vue"),
			},
			{
				path: "/empmg",
				name: "EmpManager",
				meta: { title: "员工管理" },
				component: () => import("../views/EmpManager.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

//登录验证跳转
router.beforeEach((to, fromm, next) => {
	const id = store.state.token;
	if (!id && to.path != "/") {
		next("/");
	} else {
		next();
	}
});

export default router;
