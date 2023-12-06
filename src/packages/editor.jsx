import { computed, defineComponent, ref } from "vue";
import "./editor.scss";
import EditorBlock from "./editorBlock";
import Library from "./library";

export default defineComponent({
    props: {
        modelValue: {
            type: Object
        }
    },
    setup(props) {
        const data = computed({
            get() {
                return props.modelValue;
            }
        });
        const containerStyles = computed(() => ({
            width: data.value.container.width + "px",
            height: data.value.container.height + "px"
        }));
        const canvasRef = ref(null);
        return () => (
            <div class="editor">
                <div class="editor-left">
                    <Library></Library>
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
                            {data.value.blocks.map((block) => (
                                <EditorBlock block={block}></EditorBlock>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
