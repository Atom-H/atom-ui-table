<template>
    <div class="view">
        <a class="btn btn-primary" @click="popup">确定</a>
        <hr>
        <v-button style="margin: 15px;" type="ghost" icon="check">确定</v-button>
        <v-button style="margin: 15px;" type="default" icon="check">确定</v-button>
        <v-button style="margin: 15px;" type="primary" icon="check">确定</v-button>
        <v-button style="margin: 15px;" type="success">确定</v-button>
        <v-button style="margin: 15px;" type="danger">确定</v-button>
        <v-button style="margin: 15px;" type="info">确定</v-button>
        <v-button style="margin: 15px;" type="warning" disabled>确定</v-button>
        <h1>{{time}}</h1>

        <div><input type="text" v-model="time"></div>

        <v-date-time v-model="date" ></v-date-time>
            
        <v-time-panel v-model="time"></v-time-panel>

        <v-drop-menu></v-drop-menu>

    </div>
</template>
<script>
import VButton from '../components/form/Button'
import VDateTime from '../components/DateTimePicker/DatePanel'
import VTimePanel from '../components/DateTimePicker/TimePanel'
import VDropDown from '../components/DropDown'

export default {
    name: 'testView',

    data() {
        return {
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
        VDateTime,VTimePanel, VDropDown
    }
}
</script>
<style lang="scss" scope>
</style>
