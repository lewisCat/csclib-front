import { createApp } from "vue";
import App from "./App.vue";
import vueRouter from "./router";
import store from "./store";
import "./assets/css/normalize.css";
import insterElementPlus from "./plugins/element";
import "./assets/css/color-dark.css";

const vue = createApp(App).use(vueRouter);
insterElementPlus(vue);
vue.use(store);
vue.mount("#app");
