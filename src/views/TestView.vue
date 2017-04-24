<template>
    <div class="view">
        <a class="btn btn-block btn-primary" @click="popup">确定</a>
        <v-notification></v-notification>        
    </div>
</template>
<script>
import VNotification from '../components/Notification/Main'

export default {
    name: 'testView',

    data() {
        return {};
    },

    methods: {
        popup() {
            this.$notify('ID: ')
            // this.$confirm(1234567890, {
            //     holdTime: 100000
            // }).then(() => {}).catch(() => {});
        }
    },

    components: {
        VNotification
    }
}
</script>
<style lang="scss" scope>
</style>
