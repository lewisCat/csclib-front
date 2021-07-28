<template>
	<div class="emp-manager">
		<div class="tags-title">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item
					><i class="el-icon-user"></i>员工管理</el-breadcrumb-item
				>
			</el-breadcrumb>
		</div>
		<div class="container"></div>
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

		return {};
	},
});
</script>

<style scoped></style>
