<template>
	<div class="emp-manager">
		<div class="tags-title">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-user"></i>员工管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!-- 主区域 -->
		<div class="container">
			<!-- 操作区域 -->
			<div class="operation-region">
				<div class="operation-region-flex">
					<div style="flex-grow: 0; flex-shrink: 0; width: 350px">
						<el-input
							v-model="searchKeyWord.keyWord"
							placeholder="输入要查找的员工姓名"
							suffix-icon="el-icon-search"
							size="medium"
							clearable
						>
						</el-input>
					</div>
					<el-select size="medium" v-model="searchKeyWord.company" placeholder="请选择要查询的公司">
						<el-option
							v-for="item in companysinfo"
							:key="item.value"
							:value="item.value"
							:label="item.company"
						></el-option>
					</el-select>
					<el-button type="primary" icon="el-icon-search" size="medium" round @click="searchEmp"
						>搜索</el-button
					>

					<el-button type="primary" size="medium" round @click="openAddemp" icon="el-icon-plus"
						>新增员工</el-button
					>
				</div>
			</div>
			<!-- 数据表格区域 -->
			<div>
				<el-table :data="employese" style="width: 100%" empty-text="无">
					<el-table-column label="员工姓名" prop="name"> </el-table-column>
					<el-table-column label="身份证号" prop="sid"> </el-table-column>
					<el-table-column label="联系电话" prop="phonenum"> </el-table-column>
					<el-table-column label="所属公司" prop="company"> </el-table-column>
					<el-table-column label="入职日期" prop="entryday"> </el-table-column>
					<el-table-column label="离职日期" prop="outday"> </el-table-column>

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
									<el-button icon="el-icon-delete" type="text" class="red">删除</el-button>
								</template>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页按钮 -->
			<div style="text-align: center; padding-top: 10px">
				<el-pagination
					background
					layout="prev, pager, next"
					:total="cutPage.count"
					:page-size="cutPage.size"
					:current-page="cutPage.current"
				>
				</el-pagination>
			</div>
		</div>

		<!-- 新增员工表单-->
		<el-dialog title="新增员工" center v-model="showAddemp" width="40%">
			<div class="add-emp-form">
				<el-form
					:model="employe"
					ref="addempFrom"
					:rules="rules"
					label-width="80px"
					:inline="false"
					size="small"
				>
					<el-form-item label="员工姓名" prop="name">
						<el-input v-model="employe.name"></el-input>
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
					<el-form-item label="入职日期" prop="entryday">
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
							<el-button type="primary" @click="addemp">新增</el-button>
							<el-button @click="showAddemp = false">取消</el-button>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, triggerRef } from "vue";
import request from "@/plugins/request";
import { ElMain, ElMessage } from "element-plus";
import axios from "axios";
import datefmt from "@/plugins/dateFormate";

export default defineComponent({
	name: "EmpManager",
	setup() {
		const employe = reactive({
			id: "",
			name: "",
			sid: "",
			status: "",
			phonenum: "",
			entryday: "",
			outday: "",
			company: "",
		});

		const cutPage = reactive({
			current: 1,
			size: 5,
			count: 10,
		});

		const searchKeyWord = reactive({
			keyWord: "",
			company: "",
		});
		const searchCondition = ref("name");
		const showAddemp = ref(false);
		const addempFrom = ref(null);

		const employese = reactive([]);
		//公司信息
		const companysinfo = [
			{
				company: "中建国信工程建设集团有限公司",
				value: "中建国信工程建设集团有限公司",
			},
			{
				commpany: "中电凯源科技有限公司",
				value: "中电凯源科技有限公司",
			},
		];
		//搜索员工信息
		const searchEmp = () => {};

		//新增员工按钮事件
		const openAddemp = () => {
			showAddemp.value = true;
			if (addempFrom.value) {
				addempFrom.value.resetFields();
			}
		};

		//获取员工信息
		const getEmpInfos = () => {
			axios
				.all([
					request.get("/emp/count"),
					request.get("/emp/list", { params: { current: cutPage.current, size: cutPage.size } }),
				])
				.then(
					axios.spread((res1, res2) => {
						cutPage.count = res1.data;
						res2.data.forEach(element => {
							element.entryday = datefmt(element.entryday);
							if (element.outday == "" || !element.outday) {
								element.outday = "无";
							} else {
								element.outday = datefmt(element.outday);
							}
							employese.push(element);
						});
					})
				);
		};

		getEmpInfos();
		// 新增员工
		const addemp = () => {
			addempFrom.value.validate(vali => {
				if (vali) {
					request.post("/emp/add", employe).then(res => {
						console.log(res.data);
						if (res.data) {
							ElMessage.success("员工信息增加成功!");
							showAddemp.value = false;
							employese.length = 0;
							getEmpInfos();
						} else {
							ElMessage.error("员工信息增加失败!");
						}
					});
				} else {
					return false;
				}
			});
		};

		const handleEdit = (index, row) => {};

		const handleDelete = (index, row) => {};

		//#region 表单数据校验
		// 身份证号码校验
		const validateSid = (rule, value, callback) => {
			if (value == "" || !value) {
				callback(new Error("身份证号码不能为空"));
				return;
			}
			console.log(value);

			request.post("/emp/qbsid", value).then(res => {
				if (res.data) {
					callback(new Error("该身份证员工已存在,请检查身份证信息"));
				} else {
					callback();
				}
			});
		};
		//电话号码校验

		const rules = {
			name: {
				required: true,
				message: "请输入员工姓名",
				trigger: "blur",
			},
			sid: {
				required: true,
				validator: validateSid,
				trigger: "blur",
			},
			phonenum: {
				required: true,
				message: "请输入员工联系电话",
				trigger: "blur",
			},
			entryday: {
				required: true,
				message: "请选择员工入职日期",
				trgger: "change",
			},
			company: {
				required: true,
				message: "请选择员工所属公司",
				trgger: "change",
			},
		};
		//#endregion

		return {
			employe,
			employese,
			searchCondition,
			searchKeyWord,
			cutPage,
			addempFrom,
			rules,
			showAddemp,
			companysinfo,

			addemp,
			handleEdit,
			handleDelete,
			openAddemp,
			searchEmp,
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
