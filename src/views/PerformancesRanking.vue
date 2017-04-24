<template>
    <div class="view-ranking">

    </div>
</template>
<script>
import VInput from '../components/form/Input'

export default {
    name: 'loginView',

    mounted() {
        this.$store.commit('exit');
    },

    data() {
        return {
            password: ''
        }
    },

    computed: {
        userName: {
            get() {
                return this.$store.state.loginModule.userName;
            },

            set(value) {
                this.$store.commit('saveUserName', value);
            }
        }
    },

    methods: {
        /**
         * 登陆, 获取accessToken
         */
        login(e) {
            if (undefined == e.keyCode || 13 == e.keyCode) {
                this.$store.dispatch('login', {
                    userName: this.userName,
                    password: this.password
                }).then((res) => {
                    if (1 == res.status) {
                        this.$router.push({
                            path: res.data.path,
                            query: res.data.query
                        });
                    } else {
                        this.$alert(res.message);
                    }
                });
            }
        }
    },

    components: {
        VInput
    }
}
</script>
<style scope lang="scss">

</style>
