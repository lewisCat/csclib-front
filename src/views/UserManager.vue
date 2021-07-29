/* 系统用户管理视图 */
<template>
	<div class="user-manager">
		<div class="tags-title">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-setting"></i>用户管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="container">
			<!-- 操作区域 -->
			<div class="operation-region">
				<el-button type="primary" size="small" @click="showDialog">新增用户</el-button>
			</div>

			<!-- 列表区域 -->
			<el-table :data="userlist" style="width: 100%">
				<el-table-column label="用户名称" prop="sysname"> </el-table-column>
				<el-table-column label="用户权限" prop="roleid"> </el-table-column>
				<el-table-column label="创建日期" prop="gtmCreate"> </el-table-column>

				<el-table-column align="right">
					<template #default="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"
							>编辑</el-button
						>
						<el-popconfirm
							title="确定要删除用户吗？"
							confirm-button-text="确定"
							cancelButtonText="取消"
							@confirm="handleDelete(scope.$index, scope.row)"
						>
							<template #reference>
								<el-button icon="el-icon-delete" type="text" class="red">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 新增用户界面-->
		<el-dialog title="新增用户" center v-model="showAddUser" width="35%">
			<el-form ref="formRefAdduser" :model="userInfo" status-icon :rules="rules" size="small">
				<el-form-item label="用户名称" prop="name">
					<el-input v-model="userInfo.name" autocomplete="off" size="small"></el-input>
				</el-form-item>
				<el-form-item label="用户密码" prop="password">
					<el-input type="password" v-model="userInfo.password" show-password></el-input>
				</el-form-item>
				<el-form-item label="密码确认" prop="ckpassword">
					<el-input type="password" v-model="userInfo.ckpassword" show-password></el-input>
				</el-form-item>
				<el-form-item label="用户权限" prop="role">
					<el-select v-model="userInfo.role" placeholder="请选择">
						<el-option key="0" label="管理员" value="0" />
						<el-option key="1" label="普通用户" value="1" />
					</el-select>
				</el-form-item>
				<div style="text-align: center">
					<el-button type="primary" @click="addNewUser">新增</el-button>
					<el-button type="info" @click="showAddUser = false">取消</el-button>
				</div>
			</el-form>
		</el-dialog>

		<!-- 修改用户信息界面 -->
		<el-dialog title="修改用户" center v-model="showModify" width="35%">
			<el-form ref="formRefmodify" :model="userInfo" status-icon :rules="rules" size="small">
				<el-form-item label="用户名称" prop="name">
					<el-input v-model="userInfo.name" autocomplete="off" size="small"></el-input>
				</el-form-item>
				<el-form-item label="用户密码" prop="password">
					<el-input type="password" v-model="userInfo.password" show-password></el-input>
				</el-form-item>
				<el-form-item label="密码确认" prop="ckpassword">
					<el-input type="password" v-model="userInfo.ckpassword" show-password></el-input>
				</el-form-item>
				<el-form-item label="用户权限" prop="role">
					<el-select v-model="userInfo.role" placeholder="请选择">
						<el-option key="0" label="管理员" value="0" />
						<el-option key="1" label="普通用户" value="1" />
					</el-select>
				</el-form-item>
				<div style="text-align: center">
					<el-button type="primary" @click="mdoifyUser">修改</el-button>
					<el-button type="info" @click="showModify = false">取消</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
import request from "@/plugins/request";
import dateFmt from "@/plugins/dateFormate";
import { ElMessage } from "element-plus";

export default defineComponent({
	name: "UserManager",
	setup() {
		const userInfo = reactive({
			id: "",
			name: "",
			password: "",
			ckpassword: "",
			role: "",
		});
		const userlist = reactive([]); //用户列表
		const showAddUser = ref(false); //新增用户界面控制显示
		const formRefAdduser = ref(null); //新增用户el
		const showModify = ref(false); //修改el显示
		const formRefmodify = ref(null); //修改用户el

		//加载获取全部系统用户
		onBeforeMount(() => {
			getAllUser();
		});

		//获取全部用户方法封装
		const getAllUser = () => {
			userlist.length = 0;
			request.get("/sysuser/list").then(res => {
				res.data.forEach(user => {
					user.gtmCreate = dateFmt(user.gtmCreate);
					if (user.roleid == 0) {
						user.roleid = "系统管理员";
					} else if (user.roleid == 1) {
						user.roleid = "普通用户";
					}
					userlist.push(user);
				});
			});
		};

		//#region 事件
		//激活新增用户窗口并清空新用户模型
		const showDialog = () => {
			showAddUser.value = true;
			if (formRefAdduser.value) {
				formRefAdduser.value.resetFields();
			}
		};
		//表格编辑按钮事件
		const handleEdit = (index, row) => {
			showModify.value = true;
			userInfo.id = row.id;
			userInfo.name = row.sysname;
		};
		// 修改用户界面修改事件
		const mdoifyUser = () => {
			if (!userInfo.id || userInfo.id === "") {
				ElMessage.error("错误!用户ID丢失,请重新点击编辑!");
				return;
			}
			request
				.post("/sysuser/modify", {
					id: userInfo.id,
					sysname: userInfo.name,
					syspwd: userInfo.password,
					roleid: userInfo.role,
				})
				.then(res => {
					if (res.data) {
						ElMessage.success("用户修改成功!");
						getAllUser();
						showModify.value = false;
					} else {
						ElMessage.error("用户修改失败!");
					}
				});
		};

		//删除用户
		const handleDelete = (index, row) => {
			request
				.get("/sysuser/del", {
					params: {
						userid: row.id,
					},
				})
				.then(res => {
					if (res.data) {
						ElMessage.success("用户删除成功!");
						userlist.splice(index, 1);
					} else {
						ElMessage.error("用户删除失败!");
					}
				});
		};
		//新增用户
		const addNewUser = () => {
			formRefAdduser.value.validate(vali => {
				if (vali) {
					request
						.post("/sysuser/add", {
							sysname: userInfo.name,
							syspwd: userInfo.password,
							roleid: userInfo.role,
						})
						.then(res => {
							if (res.data) {
								ElMessage.success("新增用户成功!");
								getAllUser();
								showAddUser.value = false;
							} else {
								ElMessage.error("新增用户失败!");
							}
						});
				} else {
					ElMessage.error("输入有误,请重新输入!");
					formRefAdduser.value.resetFields();
					return false;
				}
			});
		};
		//#endregion

		//#region 表单数据校验
		//用户名验证
		const validatName = (rule, value, callback) => {
			if (value === "" || !value) {
				callback(new Error("请输入用户名称"));
			} else {
				request.get("/sysuser/query", { params: { userName: userInfo.name } }).then(res => {
					if (res.data.id) {
						callback(new Error("用户名已存在!请更换用户名..."));
					} else {
						callback();
					}
				});
			}
		};
		// 双重密码验证
		const validatckPassword = (rule, value, callback) => {
			if (value === "" || !value) {
				callback(new Error("请再次输入密码!"));
			} else if (value !== userInfo.password) {
				callback(new Error("两次输入的密码不一致,请重新输入!"));
			} else {
				callback();
			}
		};
		//校验规则
		const rules = {
			name: {
				required: true,
				validator: validatName,
				trigger: "blur",
			},
			password: { required: true, message: "请输入密码", trigger: "blur" },
			ckpassword: {
				required: true,
				validator: validatckPassword,
				trigger: "blur",
			},
			role: {
				required: true,
				message: "请选择用户权限",
				trigger: "change",
			},
		};
		//#endregion

		return {
			userlist,
			userInfo,
			showAddUser,
			formRefAdduser,
			showModify,

			addNewUser,
			showDialog,
			rules,
			handleEdit,
			handleDelete,
			mdoifyUser,
		};
	},
});
</script>

<style scoped>
.red {
	color: #ff0000;
}
</style>
