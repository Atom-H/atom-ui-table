<template>
    <div class="component-dropdown">
        <div class="text">请选择</div>
    </div>
</template>
<script>
export default {
    name: 'DropMenu',

    props: {
        value: {
            type: Array
        }
    },

    created() {

    },

    data() {
        return {
            checkboxSize: '15px'
        }
    },

    watch: {

    },

    methods: {
        selectAll() {

        }
    },

    components: {

    }
};
</script>
<style scoped lang="scss">
.component-dropdown {}
</style>
