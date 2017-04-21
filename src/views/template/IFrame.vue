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

    computed: {
        url(){
            return this.$route.query.url;
        }
    }
}
</script>

<style lang=scss scoped>
iframe{margin: -15px;}
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
