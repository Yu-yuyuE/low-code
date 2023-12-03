import { computed, defineComponent, inject } from "vue";
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

        console.log(config);

        return () => {
            const component = config.componentMap[props.block.key];
            const RenderComponent = component.render();
            return (
                <div class="block-container" style={blockStyles.value}>
                    {RenderComponent}
                </div>
            );
        };
    }
});
