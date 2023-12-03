import { computed, defineComponent } from "vue";
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
        return () => (
            <div class="block-container" style={blockStyles.value}>
                qweqw
            </div>
        );
    }
});
