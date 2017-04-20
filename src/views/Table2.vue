<template>
    <div class="com-table">
        <v-modal :value="-1 == status" :lock="true" class="v-modal">
            <v-spinner class="v-spinner"></v-spinner>
        </v-modal>
        <p v-if="0 >= dataSource.length && -1 != status" class="alert alert-warning">{{message}}</p>
        <table v-show="1 == status || -1 == status && 0 < dataSource.length" class="table table-responsive table-hover table-bordered  table-striped">
            <!-- 头 -->
            <thead>
                <tr>
                    <th>
                        <v-checkbox v-model="isCheckedAll"></v-checkbox>
                    </th>
                    <th v-for="th in columns">{{th.text}}</th>
                    <th v-if="undefined != actions">{{actions.text}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) in dataSource" :key="row[primaryKey]">
                    <td>
                        <v-checkbox :value="selectedList[i]" @input="changeCheckbox(row, i)"></v-checkbox>
                    </td>
                    <td v-for="th in columns">{{row[th.key]}}</td>
                    <td v-if="undefined != actions" class="actions">
                        <a v-for="btn in actions.btns" class="btn btn-xs btn-primary" @click="operateRow(btn.event, i)">
                            {{undefined != btn.textIndex && btn.text[row[btn.textIndex]] || btn.text}}
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import VModal from '../components/Dialog/Modal';
import VSpinner from '../components/Spinner';
import VCheckbox from '../components/form/Checkbox'

export default {
    name: 'table',

    props: {
        // 表格数据
        dataSource: {
            type: Array,
            required: true
        },
        // 标题数据
        columns: {
            type: Array,
            required: true
        },
        // 操作按钮
        actions: {
            type: Object
        },

        status: {
            type: Number,
            required: true
        },

        message: {
            type: String,
            default: '无数据'
        },

        primaryKey: {
            type: String,
            required: true
        },

        selectedList: {
            type: Array
        }
    },

    data() {
        return {
            isCheckedAll: false
        }
    },

    watch: {

    },

    methods: {
        operateRow(eventName, index) {
            this.$emit(eventName, {
                row: this.dataSource[index],
                index
            });
        },

        changeCheckbox(row, index) {
            this.$emit('select', {row, index});
        }
    },

    components: {
        VSpinner,
        VModal,
        VCheckbox
    }
};
</script>
<style scoped lang="scss">
.com-table {
    margin: 0;
    min-height: 200px;
    overflow: hidden;
    position: relative;
    table {
        margin: 0;
    }
    .v-modal {
        position: absolute;
        background: rgba(#fff, .8);
        .v-spinner {
            background: rgba(#000, .7);
            display: table;
            width: 150px;
            margin: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 1986;
            padding: 15px 0;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .25);
        }
    }
    td.actions {
        .btn {
            margin-left: 2px;
        }
    }
    .tr-enter {
        opacity: 0;
        transform: translateX(-.5rem);
    }
    .tr-enter-active {
        transition: all .5s;
    }
    .tr-leave-active {
        opacity: 0;
        transition: all .5s;
        transform: translateX(-.5rem);
    }
}
</style>
