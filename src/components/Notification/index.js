import Notification from './Main'

var plugin = {};
plugin.install = (Vue, options) => {
    var ServerComponent = Vue.extend(Notification);
    // 创建一个挂载点
    var node = document.createElement('div');
    // 起个不重复的名字
    node.id = '_app-notification-' + Math.ceil(Math.random());
    document.body.appendChild(node);
    // 挂载
    var vm = new ServerComponent().$mount('#' + node.id);
    // =================================================
    // ==============组件内调用: this.$notify==============
    // =================================================
    Vue.prototype.$notify = (content = '', options = {}) => {
        return new Promise((resolve, reject) => {
            vm.list = [...vm.list, {content, _rand: Math.random()}];
        });
    };

}

export default plugin;
