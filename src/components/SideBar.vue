<template>
	<div class="sidebar">
		<el-menu
			text-color="#bfcbd9"
			active-text-color="#20a0ff"
			:default-active="onRoutes"
			class="sidebar-el-menu"
			:collapse="collapse"
			background-color="#324157"
			unique-opened
			router
		>
			<template v-for="item in items" :key="item.index">
				<el-menu-item :index="item.index">
					<i :class="item.icon"></i>
					<template #title>{{ item.title }}</template>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
	name: "VsideBar",
	setup() {
		const store = useStore();
		const route = useRoute();
		const collapse = computed(() => store.state.collapse);
		// 组织菜单栏
		const items = reactive([
			{
				icon: "el-icon-s-home",
				title: "系统首页",
				index: "/workbench",
				role: 1,
			},
			{
				icon: "el-icon-user",
				title: "员工管理",
				index: "#2",
				role: 1,
			},
			{
				icon: "el-icon-notebook-1",
				title: "证书管理",
				index: "#3",
				role: 1,
			},
			{
				icon: "el-icon-suitcase",
				title: "项目管理",
				index: "#4",
				role: 1,
			},
			{
				icon: "el-icon-setting",
				title: "用户管理",
				index: "/usermg",
				role: 0,
			},
		]);

		//默认工作台首页
		const onRoutes = computed(() => {
			return route.path;
		});

		//页面挂载之前确定权限，目前仅有0:系统管理员，1:日常使用人员
		onBeforeMount(() => {
			const roleid = sessionStorage.getItem("roleid");
			for (let i = 0; i < items.length; i++) {
				if (!(roleid <= items[i].role)) {
					items.splice(i, 1);
				}
			}
		});

		return {
			collapse,
			items,
			onRoutes,
		};
	},
});
</script>

<style scoped>
/*style....*/

.sidebar {
	display: block;
	position: absolute;
	left: 0;
	top: 70px;
	bottom: 0;
	overflow-y: scroll;
	font-size: 1.4rem;
}
.sidebar::-webkit-scrollbar {
	width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
	width: 150px;
}
.sidebar > ul {
	height: 100%;
}
</style>
