<template>
    <div class="">
        <h1>{{xx}}</h1>
        <input type="text" v-model.number="m" style="border:1px solid #ccc; padding:15px;">
        <div class="panel">
            <div class="body">
                <span class="item-date" v-for="item in d">{{item}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: 'DateTimePickPanel',

    props: {
        value: {
            type: String
        }
    },

    data() {
        return {
            xx: null,
            m: 1
        };
    },

    computed: {
        d() {
            // Moment.locale('zh-cn');
            // moment.utc(8);
            var dates = [];
            var time = moment.utc({
                y: 2017,
                M: this.m,
                d: 25,
                h: 0,
                m: 0,
                s: 0
            });
            var activeDate = moment(time);
            // 本月第一天
            var activeBeginDate = moment(time).startOf('month');
            // 本月最后一天
            var activeEndDate = moment(time).endOf('month');
            // 上个月最后一天
            var lastEndDate = moment(activeBeginDate).subtract(1, 'day');

this.xx = (lastEndDate)

            // 上个月的几天
            for (var i = 0; i < lastEndDate.day(); i++) {
                var date = lastEndDate.date() - i;
                dates.splice(0, 0, date);
            }

            // 本月的日期
            for (var j = 1; j <= activeEndDate.date(); j++) {
                dates.push(j);
            }


            var nextBeginDate = moment(activeEndDate).add(1, 'day');

            // 下个月的几天
            var whichWeek = nextBeginDate.day();
            if (0 < whichWeek) {
                for (var k = 1; k <= 8 - whichWeek; k++) {
                    dates.push(k);
                }
            }

            return dates;
            // this.d = moment().utcOffset(0).endOf('month');
        }
    },

    destroyed() {

    }
}
</script>
<style scoped lang="scss">
.panel {
    box-shadow: 1px 2px 3px rgba(0, 0, 0, .1), -1px -2px 3px rgba(0, 0, 0, .1);
    margin: 15px;
    padding: 10px;
    overflow: hidden;
    display: inline-block;
    .body {
        width: 210px;
        display: block;
        .item-date {
            transition: all .3s;
            width: 30px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            text-align: center;
            font-size: 12px;
            &:hover {
                border-radius: 4px;
                background: #ccc;
                cursor: pointer;
            }
        }
    }
}
</style>
