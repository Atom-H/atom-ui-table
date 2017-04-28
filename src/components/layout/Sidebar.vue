<template>
    <div class="layout-sidebar">
        <ul class="menu-part">
            <template v-for="item in menu">
                <li v-if="undefined == item.children" :key="item.id">
                    <!-- 无子菜单 -->
                    <router-link :to="item.route" @click="toggle(item)">
                        {{item.text}}
                    </router-link>
                </li>
                <!-- 有子菜单 -->
                <li v-else :key="item.id" class="hasChildren">
                    <!-- 三角形 -->
                    <a @click="toggle(item)">{{item.text}}<span :class="{caret: true, rotate: item.open}"></span></a>
                    <!-- 菜单 -->
                    <ul class="children" v-show="item.open">
                        <li v-for="subItem in item.children">
                            <router-link role="a" :to="subItem.route">
                                <i :class="['fa', 'fa-'+subItem.icon]"></i> {{subItem.text}}
                            </router-link>
                        </li>
                    </ul>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'sidebar',

    data() {
        return {
            menu: []
        }
    },

    mounted() {
        this.$store.dispatch('getMenuList').then(response => {
            if (1 == response.status) {
                this.menu = response.data.menu;
            }
        });
    },

    methods: {
        toggle(item) {
            item.open = !item.open;
        }
    }
}
</script>
<style scoped lang="scss">
$bgColor: #fff;
$hoverColor: #e7e7e7;
$fontColor: #777;
.layout-sidebar {
    overflow: auto;
    width: 160px;
    transition: all .3s;
    box-shadow: 1px 0 3px rgba(0, 0, 0, .1);
    min-height: 100%;
    background: $bgColor;

    // .router-link-active{background:#69c;}
    .caret {
        transition: all .3s;
    }
    .rotate {
        transform: rotate(-90deg);
    }
   
    ul.menu-part {
        >li {

            &.hasChildren {
                overflow: hidden;
            }
            a {
                font-size: 13px;
                display: block;
                text-decoration: none;
                color: $fontColor;
                &:hover {
                    background: $hoverColor;
                    cursor: pointer;
                }
                
                &.router-link-active{color: #fff;background: #777;}

            }
            >a {
                padding: 15px;
            }
            >ul>li {
                >a {
                    padding: 15px 30px;
                }
            }
        }
    }
}
</style>
