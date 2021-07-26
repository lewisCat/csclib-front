<template>
	<div class="WorkBench">
		<!--头部区域  -->
		<v-header />
		<!-- 侧边导航栏区域 -->
		<v-sidebar />
		<div class="content-box" :class="{ 'content-collapse': collapse }">
			<v-tags />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import vHeader from "@/components/Header.vue";
import vSidebar from "@/components/SideBar.vue";
import { useStore } from "vuex";
import vTags from "@/components/Tags.vue";

export default defineComponent({
	name: "WorkBench",
	components: {
		vHeader,
		vSidebar,
		vTags,
	},
	setup() {
		const store = useStore();
		const collapse = computed(() => store.state.collapse);

		return {
			collapse,
		};
	},
});
</script>

<style scoped>
/*style....*/
.content-box {
	position: absolute;
	left: 150px;
	right: 0;
	top: 70px;
	bottom: 0;
	padding-bottom: 30px;
	-webkit-transition: left 0.3s ease-in-out;
	transition: left 0.3s ease-in-out;
	background: #f0f0f0;
}
.content-collapse {
	left: 65px;
}
</style>
