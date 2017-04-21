<template>
    <div class="add-view">
        <transition appear mode="out-in">
            <!-- 页面加载中 -->
            <v-spinner v-if="-1 == form.status">
            </v-spinner>
            <!-- 页面加载完毕 -->
            <div class="r-message" v-if="0 == form.status">
              <h3>{{form.message}}</h3>
              <a @click="back" class="btn btn-default">
                <i class="glyphicon glyphicon-return"></i> 返回
              </a>
            </div>
            <div class="body" v-else>
                <form-layout v-if="1 == form.status">
                    <v-form v-model="formValues.body" :form="form.data.form"></v-form>
                    <template slot="btn-group">
                        <a @click="back" class="btn btn-default">
                            <i class="glyphicon glyphicon-return"></i> 返回
                        </a>
                        <v-button v-if="undefined != form.data.url.submit" @click="submit" :disabled="btnSubmit.disabled" :loading="btnSubmit.loading" :icon="'check'" :type="'primary'">{{btnSubmit.text}}</v-button>
                    </template>
                </form-layout>
            </div>
        </transition>
    </div>
</template>
<script>
import FormLayout from '../../components/layout/Form'
import VSpinner from '../../components/Spinner'
import VForm from '../../components/Form'
import VButton from '../../components/form/Button'

export default {
    name: 'addView',

    data() {
        return {
            // 表单结果数据
            formValues: {
                body: {}
            },
            // 构造表单
            form: {
                status: -1,
                data: {}
            },
            btnSubmit: {
                disabled: false,
                loading: false,
                text: '确定'
            }
        };
    },

    watch: {
        /**
         * 监视路由变更
         * 触发: 处理表单(过滤)的默认值
         * 触发: 获取表格数据
         */
        $route(newValue, oldValue) {
            // 判断是否切换初始化数据变化
            if (newValue.path != oldValue.path) {
                this.httpGetBaseView(response => {
                    this.form = response.data;
                    this.setDefaultValue();
                });
            }
        }
    },

    created() {
        this.httpGetBaseView(response => {
            this.form = response.data;
            this.setDefaultValue();
        });
    },

    methods: {
        /**
         * 提取默认值到formValue
         */
        setDefaultValue() {
            this.form.data.form.forEach(component => {
                this.formValues.body[component.name] = JSON.parse(JSON.stringify(component.value));
            });
        },

        /**
         * 获取基础view数据
         * @param  {Function} cb 回调
         */
        httpGetBaseView(cb) {
            // var url = [API_ROOT, this.$route.params[0], this.$route.params[1]].join('/');
            var url = [API_ROOT, this.$route.path.replace('/home/', '')].join('/');
            axios.get(url)
                .then((response) => {
                    cb(response);
                })
                .catch((error) => {
                    syslog(error)
                });
        },

        /**
         * 提交
         */
        submit() {
            this.btnSubmit.disabled = true;
            this.btnSubmit.loading = true;
            this.btnSubmit.text = '处理中...';

            axios.post(this.form.data.url.submit, qs.stringify({
                    ...this.formValues.body,
                    ...this.form.data.formHiddenValue
                }))
                .then((response) => {
                    this.btnSubmit.disabled = false;
                    this.btnSubmit.loading = false;
                    this.btnSubmit.text = '确定';

                    this.$alert({
                        width: '200px',
                        show: true,
                        text: response.data.message,
                        holdTime: 3000,
                        lock: true,
                        afterLeave: () => {
                            try {
                                if (undefined != response.data.data) {
                                    if (undefined != response.data.data.path) {
                                        this.$router.push({
                                            path: response.data.data.path,
                                            query: response.data.data.query
                                        });
                                    } else if (undefined != response.data.data.link) {
                                        window.location.href = response.data.data.link;
                                    }
                                }
                            } catch (e) {
                                syslog(e);
                            }
                        }
                    })
                })
        },

        back() {
            this.$router.back();
        }
    },

    components: {
        VSpinner,
        FormLayout,
        VForm,
        VButton
    },

    activated() {}
}
</script>
<style>
.v-enter {
    opacity: 0;
    transform: translateY(-.5rem);
}

.v-enter-active {
    transition: all .5s;
}

.v-leave-active {
    opacity: 0;
    transition: all .5s;
    transform: translateY(-.5rem);
}
.r-message{
    text-align:center;
}
.r-message h3{
    font-family: "Microsoft YaHei UI";
    padding:10px 0px;
}
</style>
