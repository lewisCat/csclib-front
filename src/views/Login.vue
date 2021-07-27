<template>
	<!--模板区域-->
	<div class="login-page" v-loading="isLoad">
		<div class="login-top-log" />
		<div class="login-main">
			<div class="login-main-is-top">
				<span>系统登录</span>
			</div>
			<div class="login-from">
				<div class="login-input">
					<el-input
						v-model="loginuser.username"
						placeholder="请输入系统登录名称"
						suffix-icon="el-icon-user"
						clearable
						style="width: 300px"
					></el-input>
				</div>
				<div class="login-input">
					<el-input
						v-model="loginuser.password"
						type="password"
						placeholder="请输入系统登录密码"
						suffix-icon="el-icon-lock"
						clearable
						style="width: 300px"
					></el-input>
				</div>
				<div class="login-input">
					<!-- 验证码输入框 -->
					<el-input
						v-model="inputIdentifyCode"
						placeholder="请输入验证码"
						clearable
						style="width: 190px"
						suffix-icon="el-icon-more"
						@keyup.enter="login"
					></el-input>
					<sidentify
						ref="cmp_sidentify"
						v-model:changeCode.sync="identifyCode"
						:contentHeight="40"
						:contentWidth="100"
						style="vertical-align: top; margin-left: 10px"
					/>
				</div>
				<div class="login-input">
					<div class="login-button">
						<el-button
							type="primary"
							@click="login"
							style="width: 145px; font-size: 1rem"
							>登录</el-button
						>
						<el-button
							type="info"
							@click="clearInput"
							style="width: 145px; font-size: 1rem"
							>重置</el-button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { computed, defineComponent, reactive, ref } from "vue";
import Sidentify from "@/components/SIdentify.vue";
import request from "@/plugins/request";
import { sysuser } from "@/model";
import { useStore } from "vuex";
import { useRouter, RouteLocationRaw } from "vue-router";

export default defineComponent({
	name: "login",
	components: { Sidentify },
	setup() {
		const loginuser = reactive({
			username: "",
			password: "",
		});
		const cmp_sidentify = ref();
		const store = useStore();
		const identifyCode = ref("");
		const inputIdentifyCode = ref("");
		const isLoad = computed(() => store.state.isLoad);
		const router = useRouter();

		// 登录验证事件
		function login() {
			store.commit("handleIsLoad", !isLoad);
			const temp = inputIdentifyCode.value.toLocaleUpperCase();
			if (temp !== identifyCode.value) {
				ElMessage.error("验证码不正确，请重新输入验证码!");
				cmp_sidentify.value.changeCode();
				store.commit("handleIsLoad", !isLoad);
			} else {
				//用户登录验证
				request
					.post("/sysuser/login", {
						sysname: loginuser.username,
						syspwd: loginuser.password,
					})
					.then((res) => {
						if (res.data.id) {
							ElMessage.info("用户登录成功!");
							store.commit("setToken", res.data.id);
							sessionStorage.setItem("username", loginuser.username);
							sessionStorage.setItem("roleid", res.data.roleid);
							store.commit("handleIsLoad", !isLoad);
							router.push("/workbench");
						} else {
							ElMessage.error("用户名或密码错误，请重新输入!");
							cmp_sidentify.value.changeCode();
							store.commit("handleIsLoad", !isLoad);
						}
					});
			}
		}

		// 清除input
		function clearInput() {
			ElMessage("登录信息重置");
			loginuser.username = "";
			loginuser.password = "";
			inputIdentifyCode.value = "";
			cmp_sidentify.value.changeCode();
		}

		return {
			cmp_sidentify,
			identifyCode,
			loginuser,
			login,
			clearInput,
			isLoad,
			inputIdentifyCode,
		};
	},
});
</script>

<style scoped>
/*style....*/
.login-page {
	height: 100%;
	width: 100%;
	background: url("../assets/img/login-bg.jpg") no-repeat;
	background-size: 100%;
	position: absolute;
}

.login-top-log {
	width: 100%;
	height: 80px;
	background: url("../assets/img/companycompany-log.png") no-repeat;
	background-size: contain;
}

.login-main {
	width: 100%;
	height: 350px;
	background: rgba(255, 255, 255, 0.4);
	/* border-radius: 30px; */
	position: relative;
	top: 39%;
	left: 50%;
	transform: translate(-50%, -50%);
	overflow: hidden;
}

.login-main-is-top {
	text-align: center;
	border-bottom: white 0.2rem solid;
}
.login-main-is-top span {
	line-height: 3.5rem;
	font-size: 1.8rem;
	letter-spacing: 1rem;
	color: rgba(0, 0, 0, 0.3);
	font-weight: 600;
}

.login-from {
	text-align: center;
	margin-top: 1.5rem;
}
.login-from span {
	font-size: 1.3rem;
	letter-spacing: 0.5rem;
	color: rgba(0, 0, 0, 0.5);
}

.login-input {
	margin: 1rem;
}
</style>
