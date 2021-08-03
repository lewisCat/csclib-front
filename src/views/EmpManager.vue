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
							v-model="searchKeyWord.seName"
							placeholder="输入要查找的员工姓名"
							suffix-icon="el-icon-search"
							size="medium"
							clearable
						>
						</el-input>
					</div>
					<el-select
						size="medium"
						v-model="searchKeyWord.seCompany"
						placeholder="请选择要查询的公司"
					>
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
					<el-table-column label="员工姓名" prop="empname"> </el-table-column>
					<el-table-column label="身份证号" prop="sid"> </el-table-column>
					<el-table-column label="联系电话" prop="phonenum"> </el-table-column>
					<el-table-column label="所属公司" prop="company"> </el-table-column>
					<el-table-column label="入职日期" prop="entryday"> </el-table-column>
					<el-table-column label="离职日期" prop="outday"> </el-table-column>
					<el-table-column label="员工性质" prop="status"> </el-table-column>

					<el-table-column align="right">
						<template #default="scope">
							<el-button
								type="text"
								icon="el-icon-edit"
								@click="addButtonCertificate(scope.$index, scope.row)"
								>证书</el-button
							>
							<el-button
								type="text"
								icon="el-icon-notebook-1"
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
					:current-page.sync="cutPage.current"
					@current-change="currentQuery"
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
					:rules="empRules"
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
		<!-- 修改员工表单 -->
		<el-dialog title="修改员工信息" center v-model="showModifyemp" width="40%">
			<div class="add-emp-form">
				<el-form :model="employe" :rules="empRules" label-width="80px" :inline="false" size="small">
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
		<!--新增人员证书-->
		<el-dialog title="新增证书" center v-model="showAddCert" width="40%">
			<div class="add-emp-form">
				<el-form
					ref="certificates"
					:model="certificato"
					:rules="cerRules"
					label-width="80px"
					:inline="false"
					size="small"
				>
					<el-form-item label="证书名称" prop="certname">
						<el-input v-model="certificato.certname"></el-input>
					</el-form-item>
					<el-form-item label="证书编号" prop="certid">
						<el-input v-model="certificato.certid"></el-input>
					</el-form-item>
					<el-form-item label="注册日期" prop="registrydate">
						<el-date-picker
							v-model="certificato.registrydate"
							type="date"
							placeholder="注册日期"
							style="width: 100%"
							value-format="YYYY-MM-DD"
						>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="启用日期" prop="applydate">
						<el-date-picker
							v-model="certificato.applydate"
							type="date"
							placeholder="启用日期"
							style="width: 100%"
							value-format="YYYY-MM-DD"
						>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="失效日期">
						<el-date-picker
							v-model="certificato.loseefficacydate"
							type="date"
							placeholder="失效日期"
							style="width: 100%"
							value-format="YYYY-MM-DD"
						>
						</el-date-picker>
					</el-form-item>
					<el-form-item label="启用状态" prop="status">
						<el-select
							v-model="certificato.status"
							placeholder="请选择启用状态"
							style="width: 100%"
						>
							<el-option
								v-for="item in cerStatus"
								:key="item.value"
								:value="item.value"
								:label="item.title"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<div style="text-align: center">
							<el-button type="primary" @click="addCertificate">新增</el-button>
							<el-button @click="showAddCert = false">取消</el-button>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref, triggerRef, watchEffect } from "vue";
import request from "@/plugins/request";
import { ElMain, ElMessage } from "element-plus";
import axios from "axios";
import datefmt from "@/plugins/dateFormate";

export default defineComponent({
	name: "EmpManager",
	setup() {
		//员工数据模型
		const employe = reactive({
			id: "",
			empname: "",
			sid: "",
			status: "",
			phonenum: "",
			entryday: "",
			outday: "",
			company: "",
		});
		//分页模型
		const cutPage = reactive({
			current: 1,
			size: 8,
			count: 0,
		});
		//搜索关键字
		const searchKeyWord = reactive({
			seName: "",
			seCompany: "",
		});
		//员工性质模型
		const statues = reactive([
			{
				title: "内部员工",
				value: 0,
			},
			{
				title: "外部员工",
				value: 1,
			},
		]);
		const showAddemp = ref(false);
		const addempFrom = ref(null);
		const employese = reactive([]);
		const showModifyemp = ref(false);

		//证书模型
		const showAddCert = ref(false);
		const certificato = reactive({
			id: "",
			certname: "",
			certid: "",
			registrydate: "",
			applydate: "",
			loseefficacydate: "",
			empid: "",
			status: "",
			empname: "",
		});
		const cerStatus = reactive([
			{
				title: "启用",
				value: 0,
			},
			{
				title: "停用",
				value: 1,
			},
		]);
		const certificates = ref(null); //证书表单

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
		const searchEmp = () => {
			getEmpInfos(cutPage.current, cutPage.size, searchKeyWord.seCompany, searchKeyWord.seName);
		};
		//新增员工按钮事件
		const openAddemp = () => {
			showAddemp.value = true;
			if (addempFrom.value) {
				addempFrom.value.resetFields();
			}
		};

		//获取员工信息条数
		const getEmpCount = (company = "") => {
			request
				.get("/emp/count", { params: { company: company } })
				.then(res => (cutPage.count = res.data));
		};

		//综合获取员工信息列表
		const getEmpInfos = (current, size, company = "", empName = "") => {
			employese.length = 0;
			getEmpCount(company);
			request
				.get("/emp/list", {
					params: { current: current, size: size, company: company, empName: empName },
				})
				.then(res => {
					res.data.forEach(element => {
						element.entryday = datefmt(element.entryday);
						if (element.outday == "" || !element.outday) {
							element.outday = "无";
						} else {
							element.outday = datefmt(element.outday);
						}
						if (element.status == 0) {
							element.status = "内部员工";
						} else {
							element.status = "外部员工";
						}
						employese.push(element);
					});
				});
		};
		//页面挂在前初始化员工数据
		onBeforeMount(() => {
			getEmpInfos(cutPage.current, cutPage.size);
		});
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
		//编辑
		const handleEdit = (index, row) => {
			showModifyemp.value = true;
			employe.id = row.id;
			employe.name = row.name;
			employe.sid = row.sid;
			employe.phonenum = row.phonenum;
		};
		// 删除
		const handleDelete = (index, row) => {
			//判断员工是否存在证书信息
			request.get("/certificates/qbempid", { params: { empid: row.id } }).then(res => {
				if (res.data.length != 0) {
					//员工存在证书信息先删除员工证书信息
					request.get("/certificates/del", { params: { empid: row.id } }).then(res => {
						if (!res.data) {
							ElMessage.error("员工信息删除失败,请检查员工证书信息");
							return;
						}
					});
				}
			});
			//删除员工信息
			request.get("/emp/del", { params: { id: row.id } }).then(res => {
				if (res.data) {
					ElMessage.success("员工信息删除成功");
					employese.splice(index, 1);
				} else {
					ElMessage.error("员工信息删除失败,请检查员工证书信息");
				}
			});
		};
		//分页按钮事件
		const currentQuery = current => {
			console.log(current);

			cutPage.current = current;
			getEmpInfos(cutPage.current, cutPage.size, searchKeyWord.seCompany, searchKeyWord.seName);
		};
		//修改员工事件
		const modifyemp = () => {
			request.post("/emp/modify", employe).then(res => {
				if (res.data) {
					ElMessage.success("员工信息修改成功");
					getEmpInfos(cutPage.current, cutPage.size);
					showModifyemp.value = false;
				} else {
					ElMessage.error("员工信息修改失败,请检查数据!");
					return false;
				}
			});
		};
		//新增员工证书按钮事件
		const addButtonCertificate = (index, row) => {
			showAddCert.value = true;
			if (certificates.value) {
				certificates.value.resetFields();
			}
			certificato.empid = row.id;
			certificato.empname = row.name;
		};
		//新增员工证书事件
		const addCertificate = () => {
			request.post("/certificates/add", certificato).then(res => {
				if (res.data) {
					ElMessage.success("证书添加成功");
					showAddCert.value = false;
				} else {
					ElMessage.warning("证书添加失败");
				}
			});
		};

		//#region 表单数据校验
		// 身份证号码校验
		const validateSid = (rule, value, callback) => {
			if (value == "" || !value) {
				callback(new Error("身份证号码不能为空"));
				return;
			}
			if (value.length != 18) {
				callback(new Error("身份证号码少于18位"));
				return;
			}
			request.post("/emp/cksid", "sid=".concat(value)).then(res => {
				if (res.data) {
					callback(new Error("该身份证员工已存在,请检查身份证信息"));
					return;
				}
			});
			callback();
		};
		const empRules = {
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
			status: {
				required: true,
				message: "请选择员工性质",
				trgger: "change",
			},
		};

		//证书编号验证校验
		const validateCertid = (rule, value, callback) => {
			if (value == "" || value == null) {
				callback(new Error("请输入证书编号!"));
				return false;
			}
			request.get("/certificates/ckcertid", { params: { certid: value } }).then(res => {
				if (res.data) {
					callback(new Error("证书编号已存在,请检查!"));
				} else {
					callback();
				}
			});
		};

		const cerRules = {
			certname: {
				required: true,
				message: "请输入证书名称",
				trigger: "blur",
			},
			certid: {
				required: true,
				validator: validateCertid,
				trigger: "blur",
			},
			registrydate: {
				required: true,
				message: "请输入证书注册日期",
				trigger: "blur",
			},
			applydate: {
				required: true,
				message: "请输入证书启用日期",
				trigger: "blur",
			},
			status: {
				required: true,
				message: "请输入证书使用状态",
				trigger: "change",
			},
		};

		//证书编号校验
		//#endregion

		return {
			employe,
			employese,
			searchKeyWord,
			cutPage,
			addempFrom,
			empRules,
			statues,
			showAddemp,
			companysinfo,
			showModifyemp,
			certificato,
			showAddCert,
			cerStatus,
			certificates,
			cerRules,

			currentQuery,
			addemp,
			handleEdit,
			handleDelete,
			openAddemp,
			searchEmp,
			modifyemp,
			addCertificate,
			addButtonCertificate,
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
