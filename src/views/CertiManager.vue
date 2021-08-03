<template>
	<div class="certi-manager">
		<div class="tags-title">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-notebook-1"></i>证书管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 工作主区域 -->
		<div class="container">
			<div class="operation-region">
				<div class="operation-region-flex">
					<div style="flex-grow: 0; flex-shrink: 0; width: 350px">
						<el-input
							v-model="searchCert.seKey"
							placeholder="输入要查找的人员"
							suffix-icon="el-icon-search"
							size="medium"
							clearable
						>
						</el-input>
					</div>
					<el-select size="medium" v-model="searchCert.seCompany" placeholder="请选择要查询的公司">
						<el-option
							v-for="item in companysinfo"
							:key="item.value"
							:value="item.value"
							:label="item.title"
						></el-option>
					</el-select>
					<el-button type="primary" icon="el-icon-search" size="medium" round @click="seCer"
						>搜索</el-button
					>
				</div>
			</div>
			<!-- 数据展示区域 -->
			<div>
				<el-table :data="certificatoes" style="width: 100%" empty-text="无">
					<el-table-column label="人员姓名" prop="empname"> </el-table-column>
					<el-table-column label="证书名称" prop="certname"> </el-table-column>
					<el-table-column label="证书编号" prop="certid"> </el-table-column>
					<el-table-column label="所属公司" prop="company"> </el-table-column>
					<el-table-column label="注册日期" prop="registrydate"> </el-table-column>
					<el-table-column label="启用日期" prop="applydate"> </el-table-column>
					<el-table-column label="注销日期" prop="loseefficacydate"> </el-table-column>
					<el-table-column label="证书状态" prop="status"> </el-table-column>

					<el-table-column align="right">
						<template #default="scope">
							<el-button
								type="text"
								icon="el-icon-notebook-1"
								@click="handleEdit(scope.$index, scope.row)"
								>编辑</el-button
							>
							<el-popconfirm
								title="确定要删除证书吗？"
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
				<!-- 分页按钮 -->
				<div style="text-align: center; padding-top: 10px">
					<el-pagination
						background
						layout="prev, pager, next"
						:total="cutPage.count"
						:page-size="cutPage.size"
						:current-page.sync="cutPage.current"
						@current-change="currentQuery"
					>
					</el-pagination>
				</div>
			</div>
		</div>
		<!-- 修改证书区域 -->
		<el-dialog title="修改员工信息" center v-model="showModify" width="40%">
			<div class="add-emp-form">
				<el-form
					:model="certificator"
					label-width="80px"
					:inline="false"
					size="small"
					ref="modifyCerForm"
				>
					<el-form-item label="证书编号">
						<el-input v-model="certificator.certid"></el-input>
					</el-form-item>
					<el-form-item label="身份证号" prop="sid">
						<el-input
							v-model="employe.sid"
							maxlength="18"
							minlength="16"
							show-word-limit
						></el-input>
					</el-form-item>
					<el-form-item label="联系电话" prop="phonenum">
						<el-input
							v-model="employe.phonenum"
							maxlength="11"
							minlength="11"
							show-word-limit
						></el-input>
					</el-form-item>
					<el-form-item label="所属公司" prop="company">
						<el-select v-model="employe.company" placeholder="请选择所属公司" style="width: 100%">
							<el-option
								v-for="item in companysinfo"
								:key="item.value"
								:value="item.value"
								:label="item.company"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="员工性质" prop="status">
						<el-select v-model="employe.status" placeholder="请选择员工性质" style="width: 100%">
							<el-option
								v-for="item in statues"
								:key="item.value"
								:value="item.value"
								:label="item.title"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="离职日期">
						<el-date-picker
							v-model="employe.outDay"
							type="date"
							placeholder="入职日期"
							style="width: 100%"
							value-format="YYYY-MM-DD"
						>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="入职日期">
						<el-date-picker
							v-model="employe.entryday"
							type="date"
							placeholder="入职日期"
							style="width: 100%"
							value-format="YYYY-MM-DD"
						>
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<div style="text-align: center">
							<el-button type="primary" @click="modifyemp">修改</el-button>
							<el-button @click="showModifyemp = false">取消</el-button>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
import request from "@/plugins/request";
import dateFmt from "@/plugins/dateFormate";
import { ElMessage } from "element-plus";

export default defineComponent({
	name: "CertiManager",
	setup() {
		//搜索关键字搜索区域
		const searchCert = reactive({
			seKey: "",
			seCompany: "",
		});
		const companysinfo = reactive([
			{
				title: "中建国信工程建设集团有限公司",
				value: "中建国信工程建设集团有限公司",
			},
			{
				title: "中电凯源科技有限公司",
				value: "中电凯源科技有限公司",
			},
		]);
		const cutPage = reactive({
			count: 0,
			current: 1,
			size: 8,
		});
		const certificator = reactive({
			id: "",
			certid: "",
			certname: "",
			registrydate: "",
			applydate: "",
			loseefficacydate: "",
			status: "",
			empid: "",
			empname: "",
		});
		const showModify = ref(false);
		const modifyCerForm = ref(null);

		const certificatoes = reactive([]);
		//分页根据条件获取全部证书信息
		const getCerts = (current, size, empName, company) => {
			certificatoes.length = 0;
			getCount(empName, company);
			request
				.get("/certificates/list", {
					params: {
						current,
						size,
						empName,
						company,
					},
				})
				.then(res => {
					if (res.data) {
						res.data.forEach(item => {
							item.registrydate = dateFmt(item.registrydate);
							item.status = item.status == 0 ? "启用" : "停用";
							item.applydate = dateFmt(item.applydate);
							item.loseefficacydate =
								item.loseefficacydate == null ? null : dateFmt(item.loseefficacydate);
							certificatoes.push(item);
						});
					}
				});
		};
		//根据姓名或公司名获取证书数量,默认获取全部证书数量
		const getCount = (seNamme = "", seCompany = "") => {
			request.get("/certificates/count", { params: { seNamme, seCompany } }).then(res => {
				cutPage.count = res.data;
			});
		};

		//搜索证书
		const seCer = () => {
			getCerts(cutPage.current, cutPage.size, searchCert.seKey, searchCert.seCompany);
		};

		//删除证书
		const handleDelete = (index, row) => {
			console.log(row.id);
			request
				.get("/certificates/del", {
					params: {
						id: row.id,
					},
				})
				.then(res => {
					if (res.data) {
						ElMessage.success("证书删除成功");
					} else {
						ElMessage.error("证书删除失败");
					}
				});
		};

		//修改证书
		const handleEdit = (index, row) => {
			if (modifyCerForm.value != null) {
				modifyCerForm.value.resetFields();
			}
			d
		};

		//分页查询按钮事件
		const currentQuery = current => {
			cutPage.current = current;
			getCerts(cutPage.current, cutPage.size, searchCert.seKey, searchCert.seCompany);
		};

		onBeforeMount(() => {
			getCerts(cutPage.current, cutPage.size, searchCert.seKey, searchCert.seCompany);
		});

		return {
			searchCert,
			companysinfo,
			certificatoes,
			cutPage,
			showModify,
			modifyCerForm,

			seCer,
			handleDelete,
			currentQuery,
			handleEdit,
		};
	},
});
</script>

<style scoped>
.operation-region-flex {
	display: flex;
	gap: 10px;
}

.add-emp-form {
	padding: 0 auto;
}
</style>
