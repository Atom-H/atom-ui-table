<template>
    <div class="panel">
        <h1>{{d}}</h1>
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
            d: null
        };
    },

    mounted() {
        // Moment.locale('zh-cn');
        // var moment = ()=> Moment('2017-10-01 00:00:00');

        // // 本月第一天
        // var firstDay = moment().startOf('month');

        // // 上个月的最后一天
        // var lastMonthLastDay = moment().subtract(1, 'day');

        // // 星期几
        // var week = lastMonthLastDay.day(0).toObject();
        
        moment.utc(8);
        var dates = [];
        var time = moment({
            years: 2017,
            months: 3,
            days: 26,
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0
        });
        // var dates = [];
        // // 该月第一天
        // var activeBegin = time.startOf('month');
        // var activeBeginDate = activeBegin.toObject().date
        // // 该月最后一天
        // var activeEnd = time.endOf('month');
        // var activeEndDate = activeEnd.toObject().date;

        // // 上个月的最后一天
        // var end = time.subtract(1, 'day').toObject().date;

        // // 上个月的起始日期
        // var begin = activeBegin.day(0).toObject().date;

        // // 上个月和本月有交集的几天
        // for(var i = begin; i <= end; i++) {
        //     dates.push(i);
        // }

        // // 本月日期
        // for(var j = activeBeginDate; j <= activeEndDate; j++){
        //     dates.push(j);
        // }

        this.d = time.day();


        // // 星期几
        // this.d = this.d.day(0);


        // // 最后一天
        // this.d = moment().utcOffset(0).endOf('month');


    },

    destroyed() {

    }
}
</script>
<style scoped lang="scss">
</style>
