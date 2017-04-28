<template>
    <div class="cell-time-panel">
        <span ref="hour" class="hour" @mouseenter="mouseenter" @mouseleave="mouseleave">
            <ul>
                <li v-for="h in 24"  :class="{active: hour == h-1}" @click="selectHour(h-1)">{{h-1}}</li>
            </ul>
        </span>
        <span ref="minute" class="minute" @mouseenter="mouseenter" @mouseleave="mouseleave">
            <ul>
                <li v-for="m in 60" :class="{active: minute == m-1}" @click="selectMinute(m-1)">{{m-1}}</li>
            </ul>
        </span>
        <span ref="seconds" class="seconds" @mouseenter="mouseenter" @mouseleave="mouseleave">
            <ul>
                <li v-for="s in 60" :class="{active: seconds == s-1}" @click="selectSeconds(s-1)">{{s-1}}</li>
            </ul>
        </span>
    </div>
</template>
<script>
export default {
    name: 'TimePanel',

    props: {
        format: {
            type: String,
            default: 'HH : ii : SS'
        },

        value: {
            type: String
        }
    },

    data() {
        return {
            hour: 0,
            minute: 0,
            seconds: 0
        };
    },

    mounted() {
        this.convert();
    },

    methods: {
        mouseenter(e){
            e.target.style.overflowY = 'scroll';
        },

        mouseleave(e){
            e.target.style.overflowY = 'hidden';
        },

        selectHour(hour) {
            this.hour = hour;
            this.$refs.hour.scrollTop = hour * 24;
        },

        selectMinute(minute) {
            this.minute = minute;
            this.$refs.minute.scrollTop = minute * 24;
        },

        selectSeconds(seconds) {
            this.seconds = seconds;
            this.$refs.seconds.scrollTop = seconds * 24;
        },

        convert() {
            [this.hour, this.minute, this.seconds] = this.value.split(':');
            this.hour = parseInt(this.hour);
            this.minute = parseInt(this.minute);
            this.seconds = parseInt(this.seconds);
        }
    },

    watch: {
        value(time) {
            this.convert();
        }
    },

    destroyed() {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$width: 50px;
$itemHeight: 24px;

.cell-time-panel {

    // ::-webkit-scrollbar{background:$light;width: 4px;height: 2px;}
    // ::-webkit-scrollbar-thumb{background:#ccc;  border-radius: 20px;  }

    display: inline-block;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, .1), -1px -2px 3px rgba(0, 0, 0, .1);
    margin: 15px;
    overflow: hidden;
    width: $width * 3;
    box-sizing: content-box;
    font-size: 0;
    >span {
        display: inline-block;
        vertical-align: top;
        position: relative;
        overflow-x: hidden;
        overflow-y: hidden;
        height: $itemHeight * 6;
        width: $width;
        >ul {
            box-sizing: border-box;
            transform: transLateY(0);
            transition: all .3s;
            display: block;
            width: 100%;
            padding-bottom:$itemHeight * 5;
            margin:0;
            li {
                font-size: 12px;
                width: 100%;
                text-align: center;
                height: $itemHeight;
                line-height: $itemHeight;
                display: block;
                &.active {
                    background: $light;
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
    .hour {}
    .minute {}
    .seconds {}
}
</style>
