import { defineComponent, inject } from "vue";
import "./library.scss";

export default defineComponent({
    props: {},
    setup() {
        const config = inject("config");
        const componentList = config.componentList;
        const dragStart = (e, comp) => {};
        return () => (
            <div class="library-container">
                {/** 根据注册列表渲染组件库，并实现H5的拖拽*/}
                {componentList.map((comp) => (
                    <div
                        class="library-container-item"
                        draggable
                        onDragStart={(e) => dragStart(e, comp)}
                    >
                        <span>{comp.label}</span>
                        <div>{comp.preview()}</div>
                    </div>
                ))}
            </div>
        );
    }
});
