import { createApp } from "vue";
import App from "./App.vue";

import "element-plus/dist/index.css";

createApp(App).mount("#app");

/**
 * 代码思路
 * 1. 先构造假数据，实现根据位置渲染内容
 * 2. 配置组件库对应的映射关系: 预览态、操作态、渲染态 {preview: ..., render: .....}
 */
