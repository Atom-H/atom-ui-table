<template>
    <div v-if="!isClose" class="notification-item">
        <div class="scope">
            <v-close @click.native="close" class="close"></v-close>
            <a :class="['title', link && 'link']" v-html="title"></a>
            <!-- <a class="countdown">{{' ' + countDown + 's'}}</a> -->
            <p class="content" v-html="content + id"></p>
        </div>
    </div>
</template>
<script>
import VClose from '../Static/CloseButton'
export default {
    name: 'notificationItem',

    props: {
        id: {
            type: Number
        },

        link: {
            type: Boolean,
            default: false
        },

        title: {
            type: String,
            default: '通知'
        },

        content: {
            type: [String, Number]
        },

        holdTime: {
            type: Number,
            default: 3000
        }
    },

    data() {
        return {
            countDown: 0,
            isClose: false
        }
    },

    mounted() {
        setTimeout(() => {
            this.$emit('close', this.id);
        }, this.holdTime);

        var time = Math.ceil((this.holdTime - 1000) / 1000);
        this.countDown = time;
        setInterval(()=> {
            if(0 < time) {
                time--; 
                this.countDown = time;
            }
        }, 1000);
    },

    methods: {
        close() {
            this.$emit('close', this.id);
        }
    },

    components: {
        VClose
    }

}
</script>
<style scoped lang="scss">
.notification-item {
    transition: all .5s;
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
        .countdown{color: #ccc;font-size: 14px;}
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
</style>
