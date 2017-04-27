<template>
    <transition>
        <iframe width="100%" :height="h" frameborder="0" :src="url"></iframe>
    </transition>
</template>
<script>
export default {
    name: 'iFrame',

    mounted(){
    },

    data(){
        // return {h: this.$parent.$el.offsetHeight};
        return {h: 1000};
    },

    /*created() {
        if (typeof(this.$parent.$el) != 'undefined'){
            this.$parent.$el.style.padding = '0px';
        }
    },

    destroyed() {
        if (typeof(this.$parent.$el) != 'undefined'){
            this.$parent.$el.style.padding = '15px';
        }
    },*/

    computed: {
        url(){
            return this.$route.query.url;
        }
    }
}
</script>

<style lang=scss scoped>
.v-enter{
    opacity: 0;
    transform: scale(.1);

}
.v-enter-active{
    transition: all .3s;

}
.v-leave-active{
    opacity: 0;
    transform: scale(1);
    transition: all .3s;
}

</style>
