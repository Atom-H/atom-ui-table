# add/editView(添加/修改页面初始化数据)   


![](https://github.com/MaiYuan/Admin5/blob/master/docs/images/form.png?raw=true)

### 数据说明
|键名 |说明 |
| ------------ | ------------ |
|message| 文字提示[选填]  |
|status   | 1: 成功, 0: 失败  |
|data   | 渲染页面的数据  |
|data.formHiddenValue   | 可以理解为隐藏域  |
|data.form   | 表单数据, 内容为任何组件数据  |
|data.form.url.submit   | 表单提交地址, 如果submit键不存在, 那么自动隐藏提交按钮 |


### 数据示例
``` json
{
    "message": "无数据",
    "status": 1,
    "data": {
        "formHiddenValue": { "a": 1, "b": [2, 3, 4] },
        "form": [{
            "title": "上传",
            "value": null,
            "name": "uploadMulitValue",
            "column": [12, 12, 12, 12],
            "is": "uploadMulit",
            "text": "点击上传多个文件",
            "url": {
                "upload": "./mock/upload",
                "del": "./mock/success"
            }
        }, {
            "title": "编辑器",
            "value": null,
            "name": "editor",
            "column": [12, 12, 12, 12],
            "is": "editor",
            "placeholder": "请编辑器!"
        }, {
            "title": "textarea",
            "value": null,
            "name": "textarea",
            "column": [12, 12, 12, 12],
            "is": "textarea",
            "placeholder": "请编辑textarea!"
        }, {
            "title": "输入框",
            "value": null,
            "name": "inputValue",
            "is": "input",
            "placeholder": "输入吧少年",
            "column": [6, 4, 3, 3],
            "tip": "必选哦!"
        }, {
            "title": "复选框组",
            "value": null,
            "name": "checkboxGroupValue",
            "column": [12, 12, 12, 12],
            "is": "checkboxGroup",
            "children": [{
                "label": "苹果",
                "value": 11,
                "disabled": false
            }, {
                "label": "橘子",
                "value": 22,
                "disabled": false
            }, {
                "label": "梨",
                "value": 33,
                "disabled": false
            }]
        }, {
            "name": "selectGroupValue",
            "title": "单选支持组",
            "value": null,
            "column": [6, 4, 3, 3],
            "is": "select",
            "placeholder": "请选择",
            "children": [{
                "title": "A组",
                "children": [{
                    "value": 1,
                    "label": "欧美",
                    "disable": false
                }, {
                    "value": 2,
                    "label": "日韩超级家具",
                    "disable": true
                }, {
                    "value": 3,
                    "label": "地中海",
                    "disable": false
                }]
            }, {
                "title": "B组",
                "children": [{
                    "value": 4,
                    "label": "紫龙冰河形式",
                    "disable": false
                }, {
                    "value": 5,
                    "label": "弗雷",
                    "disable": true
                }, {
                    "value": 6,
                    "label": "沙漠",
                    "disable": false
                }, {
                    "value": 7,
                    "label": "违和",
                    "disable": false
                }, {
                    "value": 8,
                    "label": "郭德纲",
                    "disable": true
                }, {
                    "value": 9,
                    "label": "于谦",
                    "disable": false
                }, {
                    "value": 10,
                    "label": "三国",
                    "disable": false
                }, {
                    "value": 11,
                    "label": "诸葛亮",
                    "disable": true
                }, {
                    "value": 12,
                    "label": "三可欧",
                    "disable": false
                }]
            }]
        }, {
            "title": "多选支持组",
            "name": "selectMulitGroupValue",
            "column": [6, 4, 3, 3],
            "value": null,
            "is": "selectMulit",
            "placeholder": "请选择",
            "children": [{
                "title": "A组",
                "children": [{
                    "value": 1,
                    "label": "欧美",
                    "disable": false
                }, {
                    "value": 2,
                    "label": "日韩超级家具",
                    "disable": true
                }, {
                    "value": 3,
                    "label": "地中海",
                    "disable": false
                }]
            }, {
                "title": "B组",
                "children": [{
                    "value": 4,
                    "label": "紫龙冰河形式",
                    "disable": false
                }, {
                    "value": 5,
                    "label": "弗雷",
                    "disable": true
                }, {
                    "value": 6,
                    "label": "沙漠",
                    "disable": false
                }, {
                    "value": 7,
                    "label": "违和",
                    "disable": false
                }, {
                    "value": 8,
                    "label": "郭德纲",
                    "disable": true
                }, {
                    "value": 9,
                    "label": "于谦",
                    "disable": false
                }, {
                    "value": 10,
                    "label": "三国",
                    "disable": false
                }, {
                    "value": 11,
                    "label": "诸葛亮",
                    "disable": true
                }, {
                    "value": 12,
                    "label": "三可欧",
                    "disable": false
                }]
            }]
        }, {
            "title": "日期选择器",
            "value": null,
            "name": "timeValue",
            "column": [6, 4, 3, 3],
            "is": "dateTime",
            "placeholder": "请选择"
        }, {
            "name": "selectMulitValue",
            "title": "多选列表",
            "column": [6, 4, 3, 3],
            "is": "selectMulit",
            "value": null,
            "placeholder": "请选择",
            "children": [{
                "value": 1,
                "label": "欧美",
                "disable": false
            }, {
                "value": 2,
                "label": "日韩超级家具",
                "disable": true
            }, {
                "value": 3,
                "label": "地中海",
                "disable": false
            }, {
                "value": 4,
                "label": "紫龙冰河形式",
                "disable": false
            }, {
                "value": 5,
                "label": "弗雷",
                "disable": true
            }, {
                "value": 6,
                "label": "沙漠",
                "disable": false
            }, {
                "value": 7,
                "label": "违和",
                "disable": false
            }, {
                "value": 8,
                "label": "郭德纲",
                "disable": true
            }, {
                "value": 9,
                "label": "于谦",
                "disable": false
            }, {
                "value": 10,
                "label": "三国",
                "disable": false
            }, {
                "value": 11,
                "label": "诸葛亮",
                "disable": true
            }, {
                "value": 12,
                "label": "三可欧",
                "disable": false
            }]
        }, {
            "title": "单选框组",
            "name": "radioGroupValue",
            "is": "radioGroup",
            "value": 11,
            "column": [6, 4, 3, 3],
            "children": [{
                "label": "苹果",
                "value": 11,
                "disabled": false
            }, {
                "label": "橘子",
                "value": 22,
                "disabled": false
            }, {
                "label": "梨",
                "value": 33,
                "disabled": false
            }]
        }, {
            "name": "linkageValue",
            "value": null,
            "title": "联动",
            "column": [12, 12, 12, 12],
            "is": "linkage",
            "placeholder": "请选择",
            "children": [{
                "label": "一级",
                "name": "id1",
                "children": [{
                    "value": 1,
                    "label": "欧美",
                    "disable": false
                }, {
                    "value": 2,
                    "label": "日韩超级家具",
                    "disable": true
                }, {
                    "value": 3,
                    "label": "地中海",
                    "disable": false
                }]
            }, {
                "url": "./mock/children?level=2",
                "name": "id2",
                "label": "二级",
                "children": []
            }, {
                "url": "./mock/children?level=3",
                "name": "id3",
                "label": "三级",
                "children": []
            }, {
                "url": "./mock/children?level=4",
                "name": "id4",
                "label": "四级",
                "children": []
            }]

        }],
        "url": {
            "submit": "./mock/error"
        }
    }
}
```
