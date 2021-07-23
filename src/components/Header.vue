<template>
  <div class="header">
    <!-- 按钮展开收回菜单 -->
    <div class="colapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="log">中电凯源信息管理系统</div>

    <div class="use-info">
      <span>欢迎您：</span>
      <el-dropdown>
        <span>{{ token.name }} </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- 补个人中心业务 -->
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "vHeader",

  setup() {
    const store = useStore();
    const collapse = computed(() => store.state.collapse);
    const token = computed(() => store.state.token);
    const router = useRouter();
    const collapseChage = () => {
      store.commit("handleCollapse", !collapse.value);
    };

    const exit = () => {
      store.state.token.id = undefined;
      store.state.token.name = undefined;
      store.state.token.roleid = undefined;
      
      router.replace("/");
    };

    return {
      // 属性
      token,
      store,
      collapse,
      collapseChage,
      //事件
      exit,
    };
  },
});
</script>

<style scoped>
/*style....*/
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 1.5rem;
  color: #fff;
}

.colapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
  color: #fff;
  font-size: 1.5rem;
}

.log {
  float: left;
  line-height: 70px;
  color: #fff;
  font-size: 1.3rem;
}

.use-info {
  float: right;
  padding: 0px 80px;
  line-height: 70px;
  font-size: 1rem;
  color: #fff;
}

.use-info span:last-child {
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}
</style>