import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Login",
		component: () => import("../views/Login.vue"),
	},
];

export default createRouter({
	history: createWebHistory(),
	routes,
});
