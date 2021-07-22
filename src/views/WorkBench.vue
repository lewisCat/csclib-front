<template>
  <!--模板区域-->
  <div id="WorkBench">
    <div class="header">
      <v-header />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import vHeader from "@/components/Header.vue";

export default defineComponent({
  name: "WorkBench",
  components: {
    vHeader,
  },
  setup() {
    //setup...
    return {};
  },
});
</script>

<style scoped>
/*style....*/
.header {
  height: 70px;
}
</style>