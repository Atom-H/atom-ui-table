<template>
    <span class="component-row">
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: 'row',

    methods: {

    }
}
</script>
<style lang="scss" scoped>
.component-row {
    &:after {
        content: '';
        clear: both;
        visibility: hidden;
        font-size: 0;
        height: 0;
    }
    @mixin column($i) {
        display: block;
        float: left;
        min-height: 1px;
        position: relative;
        width: 100%;
        width: 100 / 12 * $i + %;
    }
    // 手机垂直状态
    @media (max-width: 575px) {
        @for $i from 1 through 12 {
            .v-col-xs-#{$i} {
                @include column($i);
            }
        }
    }
    // 手机横屏和pad垂直
    @media (min-width: 576px) and (max-width: 767px) {
        @for $i from 1 through 12 {
            .v-col-sm-#{$i} {
                @include column($i);
            }
        }
    }
    // pad垂直
    @media (min-width: 768px) and (max-width: 991px) {
        @for $i from 1 through 12 {
            .v-col-md-#{$i} {
                @include column($i);
            }
        }
    }
    // 小尺寸pc桌面系统
    @media (min-width: 992px) and (max-width: 1199px) {
        @for $i from 1 through 12 {
            .v-col-lg-#{$i} {
                @include column($i);
            }
        }
    }
    // 大尺寸pc桌面系统
    @media (min-width: 1200px) {
        @for $i from 1 through 12 {
            .v-col-xl-#{$i} {
                @include column($i);
            }
        }
    }
}
</style>
