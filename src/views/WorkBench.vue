<template>
  <div class="WorkBench">
  <!--头部区域  -->
    <v-header />
    <!-- 侧边导航栏区域 -->
    <v-sidebar />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import vHeader from "@/components/Header.vue";
import vSidebar from "@/components/SideBar.vue";

export default defineComponent({
  name: "WorkBench",
  components: {
    vHeader,
    vSidebar,
  },
  setup() {
    //setup...
    return {};
  },
});
</script>

<style scoped>
/*style....*/
.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #f0f0f0;
}
</style>