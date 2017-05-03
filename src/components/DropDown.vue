<template>
    <div class="component-dropdown" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <slot></slot>
        <transition name="dialog" @enter="enter">
            <div ref="dialog" v-show="dialog.isShow" class="dialog" :style="{top, left}">
                <slot name="dialog">我是对话框</slot>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'DropMenu',

    props: {
        value: {
            type: Array
        }
    },

    mounted() {
        window.addEventListener('resize', () => {
            this.dialog.isShow = false;
            // this.location();
        });
    },

    data() {
        return {
            top: '0',
            left: '0',
            dialog: {
                isShow: false
            }
        }
    },

    watch: {

    },

    methods: {
        enter() {
            var {
                height: dialogHeight,
                width: dialogWidth
            } = window.getComputedStyle(this.$refs.dialog, null);

            console.log(0 + dialogHeight)

            var {
                top,
                left,
                height,
                width
            } = this.$el.getBoundingClientRect();

            // syslog(window.innerHeight - this.dialog.top - dialogHeight);
        },
        /**
         * 定位
         */
        location() {
            // var {
            //     top,
            //     left,
            //     height,
            //     width
            // } = this.$el.getBoundingClientRect();

            // syslog(window.innerHeight - this.dialog.top);

            // this.dialog.isShow = true;
            // this.top = top + height + 'px';
            // this.left = left + 'px';
        },

        mouseenter() {
            this.dialog.isShow = true;
        },

        mouseleave() {
            this.dialog.isShow = false;
        }
    },

    components: {

    }
};
</script>
<style scoped lang="scss">
@import '../scss/theme.scss';
.component-dropdown {
    overflow: hidden;
    display: inline-block;
    .dialog {
        background: #fff;
        padding: $gutter 0;
        display: inline-block;
        position: fixed;
        z-index: $dropDownZIndex;
    }
}


/*动画*/

.dialog-enter-active {
    animation: dialog-in .3s;
}

.dialog-leave-active {
    animation: dialog-out .3s;
}

@keyframes dialog-in {
    0% {
        opacity: 0;
        transform: translateY(-5px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes dialog-out {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-5px);
    }
}
</style>
