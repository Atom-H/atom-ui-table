<template>
    <div class="btn-close">
        <div class="warp">
            <div class="line line-x"></div>
            <div class="line line-y"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CloseButton'
}
</script>
<style scoped lang="scss">
.btn-close {
    $lineH: 16px;
    $lineW: 2px;
    display: block;
    height: $lineH;
    width: $lineH;
    >.warp {
        transition: all .5s;
        height: $lineH;
        width: $lineH;
        position: relative;
        transform: rotate(45deg);
        >.line {
            height: $lineH;
            width: $lineW;
            border-radius: 2px;
            background: #69c;
            position: absolute;
            top: 0;
            left: 0;
        }
        >.line-x {}
        >.line-y {
            transform: rotate(90deg);
        }
        &:hover {
            cursor: pointer;
            opacity: .5;
        }
    }
}
</style>
