<template>
    <div class="view">
        <a class="btn btn-primary" @click="popup">确定</a>
        <hr>

        <v-button style="margin: 15px;" type="default" icon="check">确定</v-button>

        <v-button style="margin: 15px;" type="primary" icon="check">确定</v-button>

        <v-button style="margin: 15px;" type="success">确定</v-button>

        <v-button style="margin: 15px;" type="danger">确定</v-button>

        <v-button style="margin: 15px;" type="warning">确定</v-button>

        <v-button style="margin: 15px;" type="disabled">确定</v-button>
        
    </div>
</template>
<script>
import VButton from '../components/form/Button'

export default {
    name: 'testView',

    data() {
        return {};
    },

    methods: {
        popup() {
            // this.$alert('我就说ID: ');
            this.$alert('我就说?');

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
        VButton
    }
}
</script>
<style lang="scss" scope>
</style>
