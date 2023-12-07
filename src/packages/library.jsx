import { defineComponent, inject, toRefs } from "vue";
import "./library.scss";
import useLibraryDragger from "./useLibraryDragger";

export default defineComponent({
    props: { canvasRef: { type: Object }, data: { type: Object } },
    setup(props) {
        const canvasRef = toRefs(props).canvasRef;
        const config = inject("config");
        const componentList = config.componentList;

        // 实现组件库拖拽
        const { dragStart, dragEnd } = useLibraryDragger(canvasRef, props.data);

        return () => (
            <div class="library-container">
                {/** 根据注册列表渲染组件库，并实现H5的拖拽*/}
                {componentList.map((comp) => (
                    <div
                        class="library-container-item"
                        draggable
                        onDragstart={(e) => dragStart(e, comp)}
                        onDragend={(e) => dragEnd(e, comp)}
                    >
                        <span>{comp.label}</span>
                        <div>{comp.preview()}</div>
                    </div>
                ))}
            </div>
        );
    }
});
