import { defineComponent, inject, toRefs } from "vue";
import "./library.scss";

export default defineComponent({
    props: { canvasRef: { type: Object } },
    setup(props) {
        const canvasRef = toRefs(props).canvasRef;
        const config = inject("config");
        const { blocks, setBlocks } = inject("blocks");
        const componentList = config.componentList;
        let currentComponent = null;

        // 给画布监听以下四种动作
        const dragStart = (e, comp) => {
            canvasRef.value.addEventListener("dragover", dragOver);
            canvasRef.value.addEventListener("drop", drop);
            canvasRef.value.addEventListener("dragenter", dragEnter);
            canvasRef.value.addEventListener("dragleave", dragLeave);
            currentComponent = comp;
        };
        // 拖拽时相对画布有四种动作：进入画布、离开画布、经过画布、放下
        const dragEnter = (e) => {
            // 进入画布时添加H5拖动的标志，表示可以放置
            e.dataTransfer.dropEffect = "move";
        };
        const dragLeave = (e) => {
            // 离开画布时添加禁用标志，表示不能放置
            e.dataTransfer.dropEffect = "none";
        };
        const dragOver = (e) => {
            // 在经过画布时阻止默认事件，否则不能触发drop
            e.preventDefault();
        };
        const drop = (e) => {
            // 松手时，在画布中添加组件
            setBlocks([
                ...blocks.value,
                {
                    top: e.offsetY,
                    left: e.offsetX,
                    key: currentComponent.key,
                    zIndex: 1,
                    alignCenter: true // 表示希望拖拽松开时居中，在组件内部通过钩子函数onMounted实现
                }
            ]);

            currentComponent = null;
        };

        return () => (
            <div class="library-container">
                {/** 根据注册列表渲染组件库，并实现H5的拖拽*/}
                {componentList.map((comp) => (
                    <div
                        class="library-container-item"
                        draggable
                        onDragstart={(e) => dragStart(e, comp)}
                    >
                        <span>{comp.label}</span>
                        <div>{comp.preview()}</div>
                    </div>
                ))}
            </div>
        );
    }
});
