<template>
    <div>
        <input v-model="page" style="border:1px solid #ccc;padding:5px;">
        <v-table :selectedList="selectedList" :dataSource="dataSource" :columns="columns" :actions="actions" :status="status" :primaryKey="primaryKey" @remove="remove" @download="download" @toggle="toggle" @changeDuty="changeDuty" @select="selectRow">
        </v-table>
        <v-page v-show="0 != status" v-model="page" :count="count"></v-page>
    </div>
</template>
<script>
import VNotification from '../components/Dialog/Notification'
import VTable from './Table2'
import VPage from '../components/Page'

export default {
    name: 'testView',

    mounted() {},

    data() {
        return {
            selectedList: [true, true, true, false, true],
            status: -1,
            page: 0,
            count: 10,
            actions: {
                text: '操作',
                btns: [{
                    event: 'remove',
                    class: 'warning',
                    text: '删除'
                }, {
                    event: 'toggle',
                    text: ['启用', '禁用'],
                    class: ['success', 'danger'],
                    textIndex: 'toggleIndex'
                }, {
                    event: 'changeDuty',
                    text: ['离职', '在职', '兼职'],
                    class: ['default', 'warning', 'danger'],
                    textIndex: 'toggleIndex'
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
            this.getTableData().then(response => {});
        }
    },

    methods: {
        selectRow({row, index}){
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
                    } else {
                        this.dataSource = [];
                    }
                    resolve(response.data);
                });
            });
        },

        changeDuty({
            row,
            index
        }) {
            this.$confirm('是否执行该操作?').then(() => {
                this.status = -1;
                axios.post('./mock/success').then(response => {
                    this.dataSource[index].toggleIndex = response.data.data.index;
                    this.getTableData().then(response => {
                        this.status = 1;
                    });
                });
            }).catch(() => {

            });
        },

        toggle({
            row,
            index
        }) {
            this.$confirm('是否执行该操作?').then(() => {
                this.status = -1;
                axios.post('./mock/success').then(response => {
                    this.dataSource[index].toggleIndex = response.data.data.index;
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
                    this.dataSource.splice(index, 1);
                });
            }).catch(() => {

            });
        }
    },

    components: {
        VNotification,
        VTable,
        VPage
    }
}
</script>
<style lang="scss" scope>
</style>
