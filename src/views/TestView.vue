<template>
<div class="warp">
    <input  class="form-control" v-model="scrollTop"/>

    <scroll-view :scrollTop.sync="scrollTop">
        <v-spinner slot="background" style="margin:15px auto;">松开加载更多</v-spinner>
<!--         <h1 slot="bottom-fixed" v-model="date" style="padding:15px;background:#67c;margin:0;">
            header-fixed
        </h1> -->
        <div class="view">
            
            <a class="btn btn-primary" @click="popup">确定</a>
            <hr>
            <v-flex-box>
                <div style="padding:15px;">123456</div>
                <v-flex-item>1</v-flex-item>
            </v-flex-box>
            <div>
                <VRow>
                    <v-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <v-button style="margin: 15px;" type="ghost" icon="check">确定</v-button>
                        <v-button style="margin: 15px;" type="default" icon="check">确定</v-button>
                        <v-button style="margin: 15px;" type="primary" icon="check">确定</v-button>
                        <v-button style="margin: 15px;" type="success">确定</v-button>
                        <v-button style="margin: 15px;" type="danger">确定</v-button>
                        <v-button style="margin: 15px;" type="info">确定</v-button>
                        <v-button style="margin: 15px;" type="warning" disabled>确定</v-button>
                    </v-col>
                </VRow>
                <v-row :gutter="30">
                    <v-col :xs="12" :sm="12" :md="4" :lg="3" :xl="4">
                        <h1>{{time}}</h1></v-col>
                    <v-col :xs="12" :sm="12" :md="4" :lg="3" :xl="4">
                        <input type="text" v-model="time">
                    </v-col>
                    <v-col :push="1" :xs="12" :sm="12" :md="4" :lg="5" :xl="4">
                        <v-date-time v-model="date"></v-date-time>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col :xs="12" :sm="12" :md="4" :lg="3" :xl="4">
                        <v-time-panel v-model="time"></v-time-panel>
                    </v-col>
                    <v-col :xs="12" :sm="12" :md="4" :lg="3" :xl="4" :offset="1">
                        <v-drop-down style="margin:30px;">
                            <p class="btn btn-default">下拉</p>
                            <template slot="dialog">
                                <v-date-time v-model="date"></v-date-time>
                            </template>
                        </v-drop-down>
                    </v-col>
                </v-row>
            </div>
        </div>

        <v-spinner slot="threshold" style="height:100px;"></v-spinner>

    </scroll-view></div>
</template>
<script>
import VButton from '../components/form/Button'
import VDateTime from '../components/DateTimePicker/DatePanel'
import VTimePanel from '../components/DateTimePicker/TimePanel'
import VDropDown from '../components/DropDown'
import VRow from '../components/Row'
import VCol from '../components/Col'
import VMenu from '../components/Menu'
import VMenuItem from '../components/MenuItem'

import VFlexBox from '../components/layout/flexbox/FlexBox'
import VFlexItem from '../components/layout/flexbox/FlexItem'

import ScrollView from '../components/ScrollView2'
import VSpinner from '../components/Spinner'




export default {
    name: 'testView',

    data() {
        return {
            scrollTop: 200,
            time: '12:01:02',
            date: '2017-03-27 13:15:00'
        };
    },

    methods: {
        popup() {
            // this.$alert('我就说ID: ');
            this.$confirm('我就说?');

            // this.$notify('通过CSS3,我们能够创建动画,这可以在许多网页中取代动画图片、Flash 动画以及 JavaScript...', {
            //     title: '自定义标题',
            //     holdTime: 500000,
            //     type: 'warning'
            // });
            // this.$confirm(1234567890, {
            //     holdTime: 100000
            // }).then(() => {}).catch(() => {});
        }
    },

    components: {
        VButton,
        VMenu,
        VMenuItem,
        VDateTime,
        VTimePanel,
        VDropDown,
        VRow,
        VCol,
        VFlexBox,
        VFlexItem,
        ScrollView,VSpinner,
    }
}
</script>
<style lang="scss" scope>

.warp{height: 100%;width: 100%;position: relative;}

.view {
    height: 2000px;
}

.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
</style>
