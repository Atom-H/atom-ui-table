<template>
    <div class="layout-list-group">
        <!-- 分组 -->
        <ul v-if="isGroup" class="group">
            <li v-for="group in list">
                <h5 class="title">{{group.title}}</h5>
                <ul :class="{list: true, inline: inline}">
                    <li @click="clickItem(item)" v-for="item in group.children" :class="{active: value == item.value}">
                        {{item.label}}
                    </li>
                </ul>
            </li>
        </ul>
        <!-- 不分组 -->
        <ul v-else :class="{list: true, inline: inline}">
            <li @click="clickItem(item)" v-for="item in list" :class="{active: value == item.value}">
                {{item.label}}
            </li>
        </ul>
        <p v-show="0 == list.length" class="text-muted">无数据</p>
    </div>
</template>
<script>
export default {
    name: 'ListGroup',

    props: {
        isGroup: {
            type: Boolean
        },

        inline: {
            type: Boolean,
            default: true
        },

        list: {
            type: Array,
            required: true
        },

        value: {

        }
    },

    methods: {
        clickItem(item) {
            this.$emit('clickItem', item);
        }
    }
}
</script>
<style lang=scss scoped>
$color: #69c;
$padding:15px;
$disableColor: #ccc;
.layout-list-group {
    margin-top: 15px;
    overflow-x: hidden;
    overflow-y: auto;
    .group {
        /*组标题*/
        h5.title {
            margin: 15px;
        }
    }
    /*通用*/
    ul.list {
        margin-top: 15px;
        >li {
            color: #444;
            font-size: 12px;
            list-style: none;
            padding: 15px 30px;
            cursor: pointer;
            &:hover {
                background: #f7f7f7;
                border-radius: 4px;
            }
            &.active {
                color: $color;
            }
            &.disable {
                color: $disableColor;
            }
        }
    }
    ul.inline {
        >li {
            display: inline-block;
        }
    }
    .text-muted {
        margin-left: 15px;
    }
}
</style>
