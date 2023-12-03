import { defineComponent, inject } from "vue";
import "./library.scss";

export default defineComponent({
    props: {},
    setup() {
        const config = inject("config");
        const componentList = config.componentList;
        return () => (
            <div class="library-container">
                {/** 根据注册列表渲染组件库*/}
                {componentList.map((comp) => (
                    <div class="library-container-item">
                        <span>{comp.label}</span>
                        <div>{comp.preview()}</div>
                    </div>
                ))}
            </div>
        );
    }
});
