<template>
  <!--模板区域-->
  <span id="SIdentify" @click="changeCode">
    <canvas
      id="s-canvas"
      :width="contentWidth"
      :height="contentHeight"
    ></canvas>
  </span>
</template>

<script lang="ts">
import { RefElement } from "element-plus/lib/el-popper/src/use-popper";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "SIdentify",
  props: {
    identifyCodes: {
      //验证码从该字段中抽取生成
      type: String,
      default: "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ",
    },
    fontSizeMin: {
      // 字体最小值
      type: Number,
      default: 25,
    },
    fontSizeMax: {
      // 字体最大值
      type: Number,
      default: 35,
    },
    backgroundColorMin: {
      // 验证码图片背景色最小值
      type: Number,
      default: 200,
    },
    backgroundColorMax: {
      // 验证码图片背景色最大值
      type: Number,
      default: 220,
    },
    dotColorMin: {
      // 背景干扰点最小值
      type: Number,
      default: 60,
    },
    dotColorMax: {
      // 背景干扰点最大值
      type: Number,
      default: 120,
    },
    contentWidth: {
      //容器宽度
      type: Number,
      default: 100,
    },
    contentHeight: {
      //容器高度
      type: Number,
      default: 44,
    },
  },
  setup(porp, { attrs, emit, slots }) {
    let identifyCode = ref("");
    //setup...

    //随机生成验证码
    function makeCode(n: number) {
      for (let i = 0; i < n; i++) {
        identifyCode.value +=
          porp.identifyCodes[randomNum(0, porp.identifyCodes.length)];
      }
      emit("update:changeCode", identifyCode.value);
    }
    //生成随机数字
    function randomNum(min: number, max: number) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    //生成随机颜色
    function randomColor(min: number, max: number) {
      let r = randomNum(min, max);
      let g = randomNum(min, max);
      let b = randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
    //绘制code函数
    function drawText(ctx: any, txt: string, i: number) {
      ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色
      ctx.font = randomNum(porp.fontSizeMin, porp.fontSizeMax) + "px SimHei"; //随机生成字体大小
      let x = (i + 1) * (porp.contentWidth / (identifyCode.value.length + 1));
      let y = randomNum(porp.fontSizeMax, porp.contentHeight - 5);
      var deg = randomNum(-30, 30);
      // 修改坐标原点和旋转角度
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      // 恢复坐标原点和旋转角度
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    }
    //绘制干扰点函数
    function drawDot(ctx: any) {
      // 绘制干扰点
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(
          randomNum(0, porp.contentWidth),
          randomNum(0, porp.contentHeight),
          1,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
    //绘制干扰线函数
    function drawLine(ctx: any) {
      // 绘制干扰线
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = randomColor(100, 200);
        ctx.beginPath();
        ctx.moveTo(
          randomNum(0, porp.contentWidth),
          randomNum(0, porp.contentHeight)
        );
        ctx.lineTo(
          randomNum(0, porp.contentWidth),
          randomNum(0, porp.contentHeight)
        );
        ctx.stroke();
      }
    }
    //绘制最终图片
    function drawPic() {
      let canvas: any = document.getElementById("s-canvas");
      let ctx = canvas.getContext("2d");
      ctx.textBaseline = "bottom";
      // 绘制背景
      ctx.fillStyle = randomColor(
        porp.backgroundColorMin,
        porp.backgroundColorMax
      );
      ctx.fillRect(0, 0, porp.contentWidth, porp.contentHeight);
      // 生成并绘制验证码
      for (let i = 0; i < identifyCode.value.length; i++) {
        drawText(ctx, identifyCode.value[i], i);
      }
      drawDot(ctx);
      drawLine(ctx);
    }
    //切换验证码功能
    function changeCode() {
      identifyCode.value = "";
      makeCode(4);
    }

    watch(identifyCode, (val) => {
      drawPic();
    });

    onMounted(() => {
      makeCode(4);
      drawPic();
    });

    return {
      changeCode,
      identifyCode,
    };
  },
});
</script>

<style scoped>
/*style....*/

</style>