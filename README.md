# Admin5
> 基于Vue2.2.4 vuex2.0 vue-router2.0

> log by Raven https://sentry.io


## 使用方法

### 第一步, 安装node.js

### 第二步, 安装cnpm
```
npm i -g cnpm
```

### 第三步, 安装插件
```
cnpm i 
```

### 第四步, 修改路由信息, 追加路由
/src/router/module.home.js

```
// 列表模板
{
    path: '*/(list)*',
    component: resolve => {
        require.ensure(['../views/template/ListView'], () => {
            resolve(require('../views/template/ListView'))
        });
    }
}, 
// 新增模板
{
    path: '*/(add)*',
    component: resolve => {
        require.ensure(['../views/template/AddView'], () => {
            resolve(require('../views/template/AddView'))
        });
    }
}, 
// 编辑模板
{
    path: '*/(edit)*',
    component: resolve => {
        require.ensure(['../views/template/EditView'], () => {
            resolve(require('../views/template/EditView'))
        });
    }
}
```

## 开发模式
```
npm run dev
```

## 生成dist
```
npm run build
```


