import { computed } from "vue";

export function useFocus(data, callback) {
    const focusData = computed(() => {
        let focused = [],
            unfocused = [];
        data.value.blocks.forEach((block) => {
            (block.focus ? focused : unfocused).push(block);
        });
        return { focused, unfocused };
    });
    const clearBlocksFocus = () => {
        data.value.blocks.forEach((block) => {
            block.focus = false;
        });
    };
    // 实现获取焦点
    const blockMousedown = (e, block) => {
        e.preventDefault();
        e.stopPropagation();

        // 在block上规划一个属性focus，用于表示是否获取了焦点
        if (e.shiftKey) {
            block.focus = !block.focus;
        } else {
            if (!block.focus) {
                clearBlocksFocus();
                block.focus = true; // 清空其他block的focus属性
            } else {
                block.focus = false;
            }
        }

        // 鼠标按下之后，可能进行连续性的动作，回调传入
        callback(e);
    };
    const canvasMousedown = () => {
        // 点击画布，取消所有焦点
        clearBlocksFocus();
    };

    return { focusData, blockMousedown, canvasMousedown };
}
