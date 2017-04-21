<template>
    <div>
        <div>
            <v-checkbox v-model="isSelectedAll" :half="half">全选</v-checkbox>
        </div>
        <input v-model="page" style="border:1px solid #ccc;padding:5px;">
        <v-table :isSelectedAll="isSelectedAll" :selectedList="selectedList" :dataSource="dataSource" :columns="columns" :actions="actions" :status="status" :primaryKey="primaryKey" @remove="remove" @download="download" @toggle="toggle" @select="selectRow" @select-all="selectAll">
        </v-table>
        <v-page v-show="0 != status" v-model="page" :disable="pageDisabled" :count="count"></v-page>
        <a class="btn btn-default btn-block" @click="popup">确定</a>
    </div>
</template>
<script>
import VNotification from '../components/Dialog/Notification'
import VTable from './Table2'
import VPage from '../components/Page'
import VCheckbox from '../components/form/Checkbox'

export default {
    name: 'testView',

    mounted() {

    },

    computed: {

        pageDisabled() {
            if (-1 == this.status) {
                return true;
            }
        },

        half() {
            return this.selectedList.some(bool => {
                return !bool;
            });
        }
    },

    data() {
        return {
            isSelectedAll: false,
            selectedList: [],
            status: -1,
            page: 0,
            count: 10,
            actions: {
                text: '操作',
                btns: [{
                    event: 'remove',
                    class: 'warning',
                    text: '<i class="fa fa-remove"></i> 删除'
                }, {
                    event: 'toggle',
                    text: ['启用', '禁用'],
                    class: ['success', 'danger'],
                    textIndex: 'toggleIndex'
                }, {
                    event: 'toggle',
                    text: ['离职', '在职', '兼职'],
                    class: ['default', 'warning', 'danger'],
                    textIndex: 'dutyIndex'
                }, {
                    event: 'download',
                    text: '下载'
                }]
            },
            primaryKey: 'uid',

            dataSource: [],

            columns: [{
                text: '编号',
                key: 'uid'
            }, {
                text: '标题',
                key: 'title'
            }, {
                text: '日期',
                key: 'create_time'
            }, {
                text: '分类',
                key: 'category'
            }]
        }
    },

    mounted() {
        this.page = 1;
    },

    watch: {
        page() {
            this.status = -1;
            this.isSelectedAll = false;
            this.getTableData().then(response => {});
        }
    },

    methods: {
        popup() {
            this.$alert(1234567890, {
                holdTime: 100000
            });
        },

        selectAll(bool) {
            this.isSelectedAll = bool;
            this.selectedList = this.selectedList.map(() => {
                return bool;
            });
        },

        selectRow({
            row,
            index
        }) {
            this.selectedList.splice(index, 1, !this.selectedList[index]);
        },
        getTableData() {
            return new Promise((resolve, reject) => {
                axios('./mock/table', {
                    params: {
                        page: this.page,
                        limit: 5
                    }
                }).then(response => {
                    this.status = response.data.status;
                    if (1 == this.status) {
                        this.dataSource = response.data.data.list;
                        this.selectedList = this.dataSource.map(() => {
                            return false;
                        });
                    } else {
                        this.dataSource = [];
                    }
                    resolve(response.data);
                });
            });
        },

        toggle({
            row,
            index
        }) {
            this.$confirm('是否执行该操作?').then(() => {
                this.status = -1;
                axios.post('./mock/success').then(response => {
                    this.dataSource[index] = response.data.data.row;
                    this.status = 1;
                });
            }).catch(() => {

            });
        },

        download({
            row,
            index
        }) {
            window.location.href = row.url;
        },

        remove({
            row,
            index
        }) {
            this.$confirm('是否删除?').then(() => {
                this.status = -1;
                axios.post('./mock/success').then(() => {
                    this.status = 1;
                    this.selectedList.splice(index, 1);
                    this.dataSource.splice(index, 1);
                });
            }).catch(() => {

            });
        }
    },



    components: {
        VNotification,
        VTable,
        VCheckbox,
        VPage
    }
}
</script>
<style lang="scss" scope>
</style>
