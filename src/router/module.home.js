export var routes = [
    { path: '/', redirect: 'index/index' }, {
        path: 'index/index',
        component: resolve => {
            require.ensure(['../views/HomeView'], () => {
                resolve(require('../views/HomeView'))
            });
        },
        name: 'homeView'
    }, {
        path: 'goods/iframe',
        component: resolve => {
            require.ensure(['../views/template/IFrame'], () => {
                resolve(require('../views/template/IFrame'))
            });
        }
    }, {
        path: 'readonly100',
        component: resolve => {
            require.ensure(['../views/ReadOnlyView'], () => {
                resolve(require('../views/ReadOnlyView'))
            });
        }
    }, {
        // path: '*/(.)*(draggable)+(.)*',
        path: 'performances/draggable',
        component: resolve => {
            require.ensure(['../views/DraggableView'], () => {
                resolve(require('../views/DraggableView'))
            });
        },
        name: 'DraggableView'
    },{
        // path: '*/(.)*(DraggableDetail)+(.)*',
        path: 'performances/DraggableDetail',
        component: resolve => {
            require.ensure(['../views/DraggableDetail'], () => {
                resolve(require('../views/DraggableDetail'))
            });
        },
        name: 'DraggableDetail'
    }, {
        path: '*/(.)*(add|append|post|upload)+(.)*',
        component: resolve => {
            require.ensure(['../views/template/AddView'], () => {
                resolve(require('../views/template/AddView'))
            });
        }
    }, {
        path: '*/(.)*(edit|save|view|operate|setting|config|put)+(.)*',
        component: resolve => {
            require.ensure(['../views/template/EditView'], () => {
                resolve(require('../views/template/EditView'))
            });
        }
    }, {
        path: '*/(.)*(list|index|get|table)+(.)*',
        component: resolve => {
            require.ensure(['../views/template/ListView'], () => {
                resolve(require('../views/template/ListView'))
            });
        }
    }, {
        path: '*/(.)*(iframe)+(.)*',
        component: resolve => {
            require.ensure(['../views/template/IFrame'], () => {
                resolve(require('../views/template/IFrame'))
            });
        }
    }, {
        path: 'x/add',
        component: resolve => {
            require.ensure(['../views/template2/AddView'], () => {
                resolve(require('../views/template2/AddView'))
            });
        }
    }, {
        path: '*/edit*',
        component: resolve => {
            require.ensure(['../views/template2/EditView'], () => {
                resolve(require('../views/template2/EditView'))
            });
        }
    }, {
        path: '*/list',
        component: resolve => {
            require.ensure(['../views/template2/ListView'], () => {
                resolve(require('../views/template2/ListView'))
            });
        }
    }
]
