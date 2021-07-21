<template>
  <!--模板区域-->
  <div class="login-page" v-loading="isLoading">
    <div class="login-top-log" />
    <div class="login-main">
      <div class="login-main-is-top">
        <span>系统登录</span>
      </div>
      <div class="login-input">
        <el-input
          v-model="regName"
          placeholder="请输入系统登录名称"
          suffix-icon="el-icon-user"
          clearable
          style="width: 300px"
        ></el-input>
        <p />
        <el-input
          v-model="logPwd"
          type="password"
          placeholder="请输入系统登录密码"
          suffix-icon="el-icon-lock"
          clearable
          style="width: 300px"
        ></el-input>
        <p />
        <!-- 验证码输入框 -->
        <el-input
          v-model="inputIdentifyCode"
          placeholder="请输入验证码"
          size="normal"
          clearable
          style="width: 190px"
          suffix-icon="el-icon-more"
        ></el-input>
        <sidentify
          v-model:changeCode.sync="identifyCode"
          :contentHeight="40"
          :contentWidth="100"
          style="vertical-align: top; margin-left: 10px"
        />
        <p />
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
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import Sidentify from "../components/SIdentify.vue";

//组件构建
export default defineComponent({
  name: "login",
  components: { Sidentify },
  setup() {
    // status
    let regName = ref("");
    let logPwd = ref("");
    let isLoading = ref(false);
    let identifyCode = ref("");
    let inputIdentifyCode = ref("");

    // 函数事件
    function login() {
      let temp = inputIdentifyCode.value.toLocaleUpperCase();
      console.log(temp);
      console.log(identifyCode.value);
      if (temp !== identifyCode.value) {
        ElMessage.error("验证码不正确，请重新输入验证码!");
      } else {
        isLoading.value = true;
        ElMessage.info("系统正在建设当中");
        setTimeout(() => {
          isLoading.value = false;
        }, 1500);
      }
    }

    // 清除验证码输入框
    function clearInput() {
      ElMessage("登录信息重置");
      regName.value = "";
      logPwd.value = "";
      inputIdentifyCode.value = "";
    }
    return {
      identifyCode,
      regName,
      logPwd,
      login,
      clearInput,
      isLoading,
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

.login-input {
  text-align: center;
  margin-top: 1.5rem;
}
.login-input span {
  font-size: 1.3rem;
  letter-spacing: 0.5rem;
  color: rgba(0, 0, 0, 0.5);
}
</style>