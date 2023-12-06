/* eslint-disable vue/no-mutating-props */
import { computed, defineComponent, inject, onMounted, ref } from "vue";
import "./editorBlock.scss";

export default defineComponent({
    props: {
        block: {
            type: Object
        }
    },
    setup(props) {
        const blockStyles = computed(() => ({
            top: props.block.top + "px",
            left: props.block.left + "px",
            zIndex: props.block.zIndex
        }));
        const config = inject("config");

        const blockRef = ref(null);

        onMounted(() => {
            let { offsetWidth, offsetHeight } = blockRef.value;
            // 一般首次拖拽进入画布时希望居中，后续不需要
            if (props.block.alignCenter) {
                props.block.left = props.block.left - offsetWidth / 2;
                props.block.top = props.block.top - offsetHeight / 2;
                props.block.alignCenter = false;
            }
        });

        console.log(props.block);

        return () => {
            const component = config.componentMap[props.block.key];
            const RenderComponent = component.render();
            return (
                <div
                    class="block-container"
                    style={blockStyles.value}
                    ref={blockRef}
                >
                    {RenderComponent}
                </div>
            );
        };
    }
});
