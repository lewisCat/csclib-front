<template>
  <div class="sidebar">
    <el-menu
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      :default-active="onRoutes"
      class="sidebar-el-menu"
      :collapse="collapse"
      background-color="#324157"
      unique-opened
      router
    >
      <template v-for="item in items" :key="item.index">
        <el-menu-item :index="item.index">
          <i :class="item.icon"></i>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import menus from "@/plugins/menus";

export default defineComponent({
  name: "SideBar",
  setup() {
    const store = useStore();
    const route = useRoute();
    const collapse = computed(() => store.state.collapse);
    //默认工作台首页
    const onRoutes = computed(() => {
      return route.path;
    });

    const items = reactive(menus);

    onMounted(() => {
      const roleid = store.state.token.roleid;
      if (roleid > 0) {
        menus.pop();
        console.log(menus);
      }
    });

    return {
      collapse,
      items,

      onRoutes,
    };
  },
});
</script>

<style scoped>
/*style....*/

.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
  font-size: 1.4rem;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 150px;
}
.sidebar > ul {
  height: 100%;
}
</style>