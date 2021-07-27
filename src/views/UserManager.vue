<template>
	<div class="user-manager">
		<div class="tags-title">
			<el-breadcrumb separator="/" class="">
				<el-breadcrumb-item
					><i class="el-icon-setting"></i>用户管理</el-breadcrumb-item
				>
			</el-breadcrumb>
		</div>

		<div class="container">
			<!-- 操作区域 -->
			<div class="operation-region">
				<el-button type="primary" size="small" @click="addNewUser"
					>新增用户</el-button
				>
			</div>

			<!-- 列表区域 -->
			<el-table :data="userlist" style="width: 100%">
				<el-table-column label="用户名称" prop="sysname"> </el-table-column>
				<el-table-column label="用户权限" prop="roleid"> </el-table-column>
				<el-table-column label="创建日期" prop="gtmCreate"> </el-table-column>

				<el-table-column align="right">
					<template #default="scope">
						<el-button
							type="text"
							icon="el-icon-edit"
							@click="handleEdit(scope.$index, scope.row)"
							>编辑</el-button
						>
						<el-popconfirm
							title="确定要删除用户吗？"
							confirm-button-text="确定"
							cancelButtonText="取消"
							@confirm="handleDelete(scope.$index, scope.row)"
						>
							<template #reference>
								<el-button icon="el-icon-delete" type="text" class="red"
									>删除</el-button
								>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 新增用户界面-->
		<el-dialog title="新增用户" center v-model="showAddUser" width="35%">
			<el-form
				ref="formRef"
				:model="newUser"
				status-icon
				:rules="rules"
				size="small"
			>
				<el-form-item label="用户名称" prop="name">
					<el-input v-model="newUser.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户密码">
					<el-input type="password" v-model="newUser.password"></el-input>
				</el-form-item>
				<el-form-item label="密码确认">
					<el-input type="password" v-model="newUser.ckpassword"></el-input>
				</el-form-item>
				<el-form-item label="用户权限">
					<el-select v-model="newUser.role" placeholder="请选择">
						<el-option key="0" label="管理员" value="0" />
						<el-option key="1" label="普通用户" value="1" />
					</el-select>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
import request from "@/plugins/request";
import { log } from "util";
import dateFmt from "@/plugins/dateFormate";

export default defineComponent({
	name: "UserManager",
	setup() {
		const newUser = reactive({
			name: "",
			password: "",
			ckpassword: "",
			role: "",
		});

		const userlist = reactive([]);
		const showAddUser = ref(false); //新增用户界面控制

		//加载获取全部系统用户
		onBeforeMount(() => {
			request.get("/sysuser/list").then((res) => {
				res.data.forEach((user) => {
					user.gtmCreate = dateFmt(user.gtmCreate);
					userlist.push(user);
				});
			});
		});

		const addNewUser = () => {
			showAddUser.value = true;
			newUser.name = "";
			newUser.password = "";
		};
		const handleEdit = (index, row) => {
			console.log(index);
			console.log(row.id);
		};

		const handleDelete = (index, row) => {
			console.log(row.id);
		};

		// 新增用户验证
		//用户名验证
		const validatName = (rule, value, callback) => {
			if (value === "") {
				callback("请输入用户名称");
			} else {
				request
					.get("/sysuser/query", { params: { userName: newUser.name } })
					.then((res) => {
						if (res.data.id) {
							callback("用户名已存在!请更换用户名...");
						}
					});
			}
		};

		const rules = {
			name: [
				{
					validator: validatName,
					trigger: "blur",
				},
			],
		};

		return {
			userlist,
			newUser,
			showAddUser,

			addNewUser,
			rules,
			handleEdit,
			handleDelete,
		};
	},
});
</script>

<style scoped>
.red {
	color: #ff0000;
}
</style>
