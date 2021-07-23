import { debug } from "console";
import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Login",
		component: () => import("../views/Login.vue"),
	},
	{
		path: "/workbench",
		name: "WorkBench",
		component: () => import("../views/WorkBench.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

//登录验证跳转
router.beforeEach((to, fromm, next) => {
	const token = store.state.token;
	if (!token.id && to.path != "/") {
		next("/");
	} else {
		next();
	}
});

export default router;
