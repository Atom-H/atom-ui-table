<template>
    <div class="panel">
        <div class="weekdays">
            <span class="weekday" v-for="weekday in weekdays">{{weekday}}</span>
        </div>
        <transition-group class="days" name="list" tag="div" mode="out-in">
            <span class="day day-prev" v-for="day in prevMonthDays" :key="day.obj" @click="selectDay(day.obj)">
                {{day.num}}
            </span>
            <span class="day" v-for="day in days" :key="day.obj" @click="selectDay(day.obj)">
                {{day.num}}
            </span>
            <span class="day day-next" v-for="day in nextMonthDays" :key="day.obj" @click="selectDay(day.obj)">
                {{day.num}}
            </span>
        </transition-group>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: 'PickPanel',

    props: {
        value: {
            type: String
        }
    },

    mounted() {
        moment.locale('zh-cn');
        this.prevMonthDays = this.getPrevMonthDays();
        this.days = this.getDays();
        this.nextMonthDays = this.getNextMonthDays();
    },

    data() {
        return {
            beginDayInMonth: {}, // 本月第一天
            weekdays: ['日', '一', '二', '三', '四', '五', '六'],
            prevMonthDays: [], // 存储前月的部分日期
            days: [], // 存储本月日期
            nextMonthDays: [] // 存储下个月的部分日期
        };
    },

    methods: {
        selectDay(obj) {
            syslog(obj)
            this.$emit('input', obj.format('Y-MM-DD HH:mm:ss'));

        },

        getPrevMonthDays() {
            var days = [];
            // 本月的第一天
            this.beginDayInMonth = moment.utc(this.value).startOf('month');
            // 上个月最后一天
            var endDayInPrevMonth = moment(this.beginDayInMonth).subtract(1, 'day');
            // 上个月总天数
            var length = moment(endDayInPrevMonth).daysInMonth();

            // 上个月最后一天是周几
            var endDayWeekDayInPrevMonth = moment(endDayInPrevMonth).day();
            for (var i = 0; i <= endDayWeekDayInPrevMonth; i++) {
                var obj = moment(endDayInPrevMonth).subtract(i, 'day');
                var num = obj.date();
                days.splice(0, 0, {
                    num,
                    obj
                });
            }
            return days;
        },

        getDays() {
            var days = [];
            // 本月总天数
            var length = moment.utc(this.value).daysInMonth();
            for (var i = 1; i <= length; i++) {
                days.push({
                    num: i,
                    obj: moment(this.beginDayInMonth).add(i - 1, 'day')
                });
            }
            return days;
        },

        getNextMonthDays() {
            var days = [];
            var length = 42 - this.prevMonthDays.length - this.days.length;
            // 下个月第一天
            var beginDayInNextMonth = moment(this.beginDayInMonth).add(1, 'month');
            for (var i = 1; i <= length; i++) {
                days.push({
                    num: i,
                    obj: moment(beginDayInNextMonth).add(i - 1, 'day')
                });
            }
            return days
        }

    },

    watch: {
        value(newDate, oldDate) {
            if(!moment(newDate).isSame(oldDate, 'month')) {
                this.prevMonthDays = this.getPrevMonthDays();
                this.days = this.getDays();
                this.nextMonthDays = this.getNextMonthDays();
            }
        }
    },

    destroyed() {

    }
}
</script>
<style scoped lang="scss">
@import '../../scss/theme.scss';
$size: 36px;
$fontSize: 12px;
.panel {
    box-shadow: 1px 2px 3px rgba(0, 0, 0, .1), -1px -2px 3px rgba(0, 0, 0, .1);
    margin: 15px;
    padding: 10px;
    overflow: hidden;
    display: inline-block;
    .weekdays {
        font-size: 0;
        width: $size * 7;
        .weekday {
            width: $size;
            height: $size;
            line-height: $size;
            display: inline-block;
            text-align: center;
            font-size: $fontSize;
        }
    }
    .days {
        height: $size * 6;
        overflow: hidden;
        // 清除inline-block的空格间距
        font-size: 0;
        width: $size * 7;
        .day {
            transition: all .3s;
            width: $size;
            height: $size;
            line-height: $size;
            display: inline-block;
            text-align: center;
            font-size: $fontSize;
            border-radius: 4px;
            &:hover {
                background: $hover;
                cursor: pointer;
                color: $base;
            }
            &.active {
                background: $base;
            }
            &-prev {
                color: #ccc;
            }
            &-next {
                color: #ccc;
            }
        }
    }
}

// 动画
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateX(30px);
}
</style>
