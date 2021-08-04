<template>
	<div class="project-manage">
		<div class="tags-title">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-suitcase"></i>项目管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
	name: "ProjectManage",
	setup() {
    
  
		return {};
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
