<template>
    <transition name="notification">
        <div v-if="!isClose" class="notification-item">
            <div class="scope">
                <v-close @click.native="close" class="close"></v-close>
                <a :class="['title', link && 'link']" v-html="title"></a>
                <p class="content" v-html="content"></p>
            </div>
        </div>
    </transition>
</template>
<script>
import VClose from '../Static/CloseButton'
export default {
    name: 'Item',

    props: {
        link: {
            type: Boolean,
            default: false
        },

        title: {
            type: String,
            default: '通知'
        },

        content: {},

        holdTime: {
            type: Number,
            default: 3000
        }
    },

    data() {
        return {
            isClose: false
        }
    },

    mounted() {
        setTimeout(() => {
            this.isClose = true;
        }, this.holdTime);
    },

    methods: {
        close() {
            this.$emit('close')
        }
    },

    components: {
        VClose
    }


}
</script>
<style scoped lang="scss">
.notification-item {
    width: 320px;
    margin: 15px 0;
    border-radius: 4px;
    background: #fff;
    border: 1px solid #eee;
    box-shadow: 1px 2px 5px rgba(#000, .1);
    .scope {
        padding: 15px;
        position: relative;
        .close {
            position: absolute;
            top: 15px;
            right: 15px;
        }
        .title {
            font-size: 14px;
            color: #222;
            text-decoration: none;
        }
        .link {
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
        .content {
            font-size: 12px;
            color: #666;
            letter-spacing: 1px;
            padding: 0;
            margin: 5px 0;
        }
    }
}

// 动画
.notification-enter-active {
    animation: notification-in .5s;
}

.notification-leave-active {
    animation: notification-out .5s;
}

@keyframes notification-in {
    0% {
        opacity: 0;
        transform: translateY(15px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes notification-out {
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
