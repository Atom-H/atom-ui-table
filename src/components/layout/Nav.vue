<template>
    <nav class="layout-nav">
        <span class="logo">
            <p>MY AUTO</p>
        </span>
        <span class="tools">
            <span class="envelope">
                <router-link class="label label-default" tag="span" :to="{path: listUrl.path, query: listUrl.query}">
                    <i class="fa fa-envelope" aria-hidden="true"></i> {{count}}
                </router-link>
        </span>
        <span class="avator" @mouseenter="menuShow = true" @mouseleave="menuShow = false">
            <div class="dropdown">
                <router-link tag="img" :to="{path: '/home/personal/edit'}" :src="$store.state.loginModule.avator">
                </router-link>
                <ul v-show="menuShow" class="dropdown-list">
                    <router-link tag="li" :to="{path: '/home/personal/edit'}">
                        <i class="fa fa-user"></i> 个人中心
                    </router-link>
                    <router-link tag="li" :to="{path: '/login'}">
                        <i class="fa fa-power-off"></i> 退出
                    </router-link>
                </ul>
            </div>
            </span>
        </span>
    </nav>
</template>
<script>
import Push from 'push.js'
export default {
    name: 'Nav',

    data() {
        return {
            menuShow: false,
            count: 0,
            listUrl: '',
            list: []
        };
    },

    mounted() {
        this.getList();
        setInterval(() => {
            this.getList();
        }, 100000);
    },

    methods: {
        getList() {
            axios.get(MESSAGE_LIST).then(response => {
                if (1 == response.data.status) {
                    this.count = response.data.data.message.count;
                    this.listUrl = {
                        path: response.data.data.message.path,
                        query: response.data.data.message.query
                    }
                    this.list = response.data.data.message.list;
                    this.list.forEach(item => {
                        Push.create(item.title, {
                            body: `[${[item.create_time]}] ${item.desc}`,
                            icon: item.icon,
                            timeout: 1800000,
                            onClick: () => {
                                this.$router.push({
                                    path: item.path,
                                    query: item.query
                                });
                                window.focus();
                            }
                        });
                    });
                }
            });
        }
    }
}
</script>
<style scoped lang=scss>
$h: 50px;
.layout-nav {
    padding: 0 15px;
    height: $h;
    border-radius: 0;
    position: relative;
    z-index: 1958;
    background: #fff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, .2);
    .logo {
        float: left;
        height: $h;
        p {
            height: $h;
            line-height: $h;
            color: #666;
            font-size: 20px;
        }
    }
    .tools {
        float: right;
        height: $h;
        .envelope {
            float: left;
            margin: 15px;
            &:hover {
                cursor: pointer;
            }
        }
        .avator {
            $avatorWidth: 30px;
            float: left;
            margin: 10px;
            width: $avatorWidth;
            height: $avatorWidth;
            border-radius: 3px;
            &:hover {
                cursor: pointer;
            }
            .dropdown-list {
                background: rgba(#fff, 1);
                border-radius: 2px 0 2px 2px;
                border: 1px solid #eee;
                box-shadow: -1px 1px 3px rgba(#000, .2);
                display: block;
                position: fixed;
                top: 40px;
                right: 22px;
                li {
                    width: 100%;
                    display: block;
                    padding: 5px 15px;
                    text-align: left;
                    &:hover {
                        background: #eee;
                    }
                }
            }
            img {
                display: block;
                width: 100%;
            }
        }
    }
}
</style>
