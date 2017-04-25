<template>
    <transition name="confirm" @after-leave="afterLeave">
        <div v-show="value" class="component-confirm" :style="{width: width}">
            <div class="header">
                <h1 class="title" v-html="title"></h1>
            </div>
            <div class="body" v-html="text"></div>
            <div class="footer">
                <a @click="ok" class="btn-ok">确定</a>
                <a @click="cancel" class="btn-cancel">取消</a>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Confirm',

    props: {
        value: {
            type: Boolean
        },

        width: {
            default: '400px'
        },

        text: {
            type: [String, Number]
        },

        title: {
            type: String,
            default: '提示'
        },

        holdTime: {
            type: Number,
            default: 3000
        },

        lock: {
            type: Boolean
        }
    },

    methods: {
        ok() {
            this.$emit('ok');
            this.$emit('input', false);
        },

        afterLeave() {
            this.$emit('after-leave');
        },

        cancel() {
            this.$emit('cancel');
            this.$emit('input', false);
        }
    },

    computed: {
        isShow: {
            get() {
                return this.value;
            },

            set(isShow) {
                this.$emit('input', isShow);
            }
        }
    }
}
</script>
<style scoped lang="scss">
.component-confirm {
    border-radius: 4px;
    background: #fff;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, .2);
    >.header {
        padding: 15px;
        >.title {
            margin: 0;
            font-size: 16px;
        }
    }
    >.body {
        padding: 15px;
    }
    >.footer {
        padding: 15px;
        overflow: hidden;
        @mixin btn() {
            margin-right: 5px;
            float: right;
            padding: 5px 15px;
            border-radius: 4px;
            cursor: pointer;
            letter-spacing: 1px;
            &:hover {
                text-decoration: none;
                opacity: .7;
            }
        }
        .btn-ok {
            border: 1px solid #69c;
            color: #69c;
            @include btn();
        }
        .btn-cancel {
            border: 1px solid #999;
            color: #999;
            @include btn();
        }
    }
}

// 动画
.confirm-enter-active {
    animation: confirm-in .5s;
}

.confirm-leave-active {
    animation: confirm-out .5s;
}

@keyframes confirm-in {
    0% {
        opacity: 0;
        transform: translateY(15px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes confirm-out {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(15px);
    }
}
</style>
