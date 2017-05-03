<template>
    <span :class="className">
        <slot></slot>
    </span>
</template>
<script>
export default {
    name: 'col',

    props: {
        span: {
            default: 12
        },

        xs: {
            default: 12
        },

        sm: {
            default: 12
        },

        md: {
            default: 12
        },

        lg: {
            default: 12
        },

        xl: {
            default: 12
        }
    },

    computed: {
        className(){
            return ['v-col-xs-' + this.xs,
            'v-col-sm-' + this.sm,
            'v-col-md-' + this.md,
            'v-col-lg-' + this.lg,
            'v-col-xl-' + this.xl].join(' ');
        }
    },

    methods: {

    }
}
</script>
<style lang="scss" scoped>
.component-col {}
</style>
