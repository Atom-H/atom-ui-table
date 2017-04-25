<template>
    <span :class="['com-button com-button-' + type, !!disabled && 'disabled']" @click="click" @mouseleave="mouseleave" @mouseenter="mouseenter">
        <!-- 背景动画 -->
        <i v-if="icon" v-show="!loading" :class="['fa', 'fa-'+icon]"></i>
        <span v-show="openText">
            <slot></slot>
            <i v-show="loading" class="fa fa-spinner fa-spin"></i>
        </span>
    </span>
</template>
<script>
export default {
    name: 'button',

    props: {
        loading: {
            type: Boolean
        },

        showText: {
            type: Boolean,
            default () {
                return true;
            }
        },

        disabled: {
            type: Boolean
        },

        value: {

        }
    },

    data() {
        return {
            icon: '',
            type: 'default',
            openText: this.showText
        };
    },

    mounted() {
        var type = this.$el.getAttribute('type');
        if(!!type) {
            this.type = type;
        }

        var icon = this.$el.getAttribute('icon');
        if(!!type) {
            this.icon = icon;
        }
    },

    methods: {
        mouseenter() {
            if (!this.showText) {
                this.openText = true;
            }
        },

        mouseleave() {
            if (!this.showText) {
                this.openText = false;
            }
        },

        click() {
            this.$emit('click');
        }
    }
}
</script>
<style scoped lang="scss">
$default: #777;
$primary: #69c;
$success: #5cb85c;
$warning: #f0ad4e;
$danger: #d9534f;
$disabled: #ccc;
@mixin button($type) {
    border: 1px solid $type;
    color: $type;
    &:hover {
        opacity: .7;
    }
    &:active {}
}

.com-button {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    touch-action: manipulation;
    user-select: none;
    border-radius: 4px;
    display: inline-block;
    padding: 5px 15px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    letter-spacing: 1px;
    text-decoration: none;
    transition: .2s;
}

.com-button-default {
    @include button($default);
}

.com-button-primary {
    @include button($primary);
}

.com-button-success {
    @include button($success);
}

.com-button-warning {
    @include button($warning);
}

.com-button-danger {
    @include button($danger);
}

.com-button-disabled {
    @include button($disabled);
    &:hover {
        cursor: auto;
    }
}

.v-enter-active {
    animation: in .2s;
}

.v-leave-active {
    animation: out .2s;
}

@keyframes in {
    0% {
        opacity: 0;
        transform: scale(2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes out {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(2);
    }
}
</style>
