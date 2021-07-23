// 系统菜单对象
import { menu } from "../model";
import store from "../store";

let menus: Array<menu> | null = [
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
		index: "#5",
		role: 0,
	},
];

export default menus;
