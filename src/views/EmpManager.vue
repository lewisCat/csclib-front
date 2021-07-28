<template>
	<div class="emp-manager">
		<div class="tags-title">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item
					><i class="el-icon-user"></i>员工管理</el-breadcrumb-item
				>
			</el-breadcrumb>
		</div>
		<!-- 主区域 -->
		<div class="container">
			<!-- 操作区域 -->
			<div class="operation-region">
				<div class="operation-region-flex">
					<div style="flex-grow: 0; flex-shrink: 0; width: 350px">
						<el-input
							v-model="searchKeyWord"
							placeholder="输入要查找的员工姓名"
							suffix-icon="el-icon-search"
							size="medium"
							clearable
							@keydown.enter="searchEmp"
						>
						</el-input>
					</div>
					<el-button
						type="primary"
						size="medium"
						round
						@click=""
						icon="el-icon-plus"
						>新增员工</el-button
					>
				</div>
				<!--  -->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

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
		});
		const searchKeyWord = ref("");
		const searchCondition = ref("name");

		const searchEmp = () => {
			alert("111");
		};

		return {
			employe,
			searchCondition,
			searchKeyWord,

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
</style>
