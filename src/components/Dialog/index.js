import MessageBus from './MessageBus'

var plugin = {};
plugin.install = (Vue, options) => {
    // Vue.component('VPrompt', Prompt);
    // document.createDocumentFragment()
    var MessageBusComponent = Vue.extend(MessageBus);
    // 创建一个挂载点
    var node = document.createElement('div');
    node.id = '_v-dialog';
    document.body.appendChild(node);
    // 挂载
    var vm = new MessageBusComponent().$mount('#_v-dialog');
    // =================================================
    // ==============组件内调用: this.$alert==============
    // =================================================
    Vue.prototype.$alert = (text = '', options = {}) => {
        return new Promise((resolve, reject) => {
                vm.modal.show = true;
                vm.alert = {
                    ...vm.alert,
                    ...options,
                    ok: () => {
                        vm.modal.show = false;
                        resolve();
                    },
                    text,
                    show: true
                };
        });
    };
    // =================================================
    // ==============组件内调用: this.$confirm============
    // =================================================
    Vue.prototype.$confirm = (options = {}) => {
        return new Promise((resolve, reject) => {
            if ('string' == typeof(options) || 'number' == typeof(options)) {
                vm.modal.show = true;
                vm.confirm = {
                    ...vm.confirm,
                    show: true,

                    ok: () => {
                        vm.modal.show = false;
                        resolve();
                    },

                    cancel: () => {
                        vm.modal.show = false;
                        reject();
                    },

                    text: options
                };
            } else {
                vm.modal.show = true;
                vm.confirm = {
                    ...vm.confirm,
                    ...options,
                    ok: () => {
                        vm.modal.show = false;
                        resolve();
                    },
                    cancel: () => {
                        vm.modal.show = false;
                        reject();
                    },
                    show: true
                };
            };
        });
    };
}

export default plugin;
