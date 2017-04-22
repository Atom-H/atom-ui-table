<template>
    <div class="component-notification">
        <notification-item v-for="(item, i) in list" :key="i" :content="item.content"></notification-item>
    </div>
</template>
<script>
import notificationItem from './Item';
export default {
    name: 'Notification',

    props: {
        value: {
            type: Boolean
        }
    },

    data() {
        return {
            list: []
        };
    },

    methods: {

    },

    components: {
        notificationItem
    }
}
</script>
<style scoped lang="scss">
.component-notification {
    position: fixed;
    z-index: 1989;
    top: 15px;
    right: 15px;
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
