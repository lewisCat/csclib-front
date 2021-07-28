<template>
	<div class="certi-manager">
		<div class="tags-title">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item
					><i class="el-icon-notebook-1"></i>证书管理</el-breadcrumb-item
				>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="operation-region">
				<el-button type="primary" size="small" @click="showDialog"
					>新增用户</el-button
				>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
	name: "CertiManager",
	setup() {
		return {};
	},
});
</script>

<style scoped></style>
