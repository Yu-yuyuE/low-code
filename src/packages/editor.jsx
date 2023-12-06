import { computed, defineComponent, provide, reactive, ref, toRefs } from "vue";
import "./editor.scss";
import EditorBlock from "./editorBlock";
import Library from "./library";
import { cloneDeep } from "lodash";

export default defineComponent({
    props: {
        modelValue: {
            type: Object
        }
    },
    emits: ["update:modelValue"],
    setup(props, ctx) {
        const data = computed({
            get() {
                return props.modelValue;
            },
            set(newValue) {
                ctx.emit("update:modelValue", cloneDeep(newValue));
            }
        });
        const containerStyles = computed(() => ({
            width: data.value.container.width + "px",
            height: data.value.container.height + "px"
        }));
        // 获取画布DOMref，传入Library中
        const canvasRef = ref(null);
        // 将blocks暴露给全局
        const blocks = ref(data.value.blocks);
        const setBlocks = (val) => {
            console.log(blocks.value);
            console.log(val);
            blocks.value = val;
        };
        provide("blocks", { blocks, setBlocks });

        return () => (
            <div class="editor">
                <div class="editor-left">
                    <Library canvasRef={canvasRef}></Library>
                </div>
                <div class="editor-top">菜单栏</div>
                <div class="editor-right">属性栏</div>
                <div class="editor-container">
                    {/* container产生滚动条 */}
                    <div class="editor-container-canvas">
                        {/* 内容区 */}
                        <div
                            class="editor-container-canvas__content"
                            style={containerStyles.value}
                            ref={canvasRef}
                        >
                            {blocks.value.map((block) => (
                                <EditorBlock block={block}></EditorBlock>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
