import { computed, defineComponent, provide, reactive, ref, toRefs } from "vue";
import "./editor.scss";
import EditorBlock from "./editorBlock";
import Library from "./library";
import { cloneDeep } from "lodash";
import { useFocus } from "./useFocus";

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
        const { focusData, blockMousedown, canvasMousedown } = useFocus(data, () => {
            console.log(focusData.value.focused);
        });

        // 实现获取焦点
        // 实现拖拽多个元素
        return () => (
            <div class="editor">
                <div class="editor-left">
                    <Library canvasRef={canvasRef} data={data}></Library>
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
                            onMousedown={canvasMousedown}
                        >
                            {data.value.blocks.map((block) => (
                                <EditorBlock
                                    class={block.focus ? "editor-block-focused" : ""}
                                    block={block}
                                    onMousedown={(e) => blockMousedown(e, block)}
                                ></EditorBlock>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
