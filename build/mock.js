var fs = require('fs');
var methods = ['get', 'post', 'put', 'delete'];

module.exports = function(express, app) {
    // 使用 Mock
    var Mock = require('mockjs');
    var bodyParser = require('body-parser')
    app.use('/mock', express.static('./src/mock/'));

    app.get('/mock/menu', function(req, res) {
        var menu = fs.readFileSync('./src/mock/menu.json', 'utf8');

        var data = {
            status: 1,
            data: {
                menu: JSON.parse(menu)
            },
            message: '操作成功!'
        };
        res.json(data);
    });

    /*
     * 列表页模板数据
     */
    app.get('/mock/*/list', function(req, res) {
        var data = fs.readFileSync('./src/mock/listView.json', 'utf8');
        var json = JSON.parse(data);
        setTimeout(() => {
            res.send(JSON.stringify(json, null, 4));
        }, 300);
    });

    /*
     * 绩效排行榜
     */
    app.get('/mock/performances/ranking', function(req, res) {
        var data = fs.readFileSync('./src/mock/PerformancesRanking.json', 'utf8');
        var json = JSON.parse(data);
        setTimeout(() => {
            res.send(JSON.stringify(json, null, 4));
        }, 300);
    });

    /*
     * 拖拽列表数据
     */
    app.get('/mock/performances/draggable', function(req, res) {
        var data = fs.readFileSync('./src/mock/draggable.json', 'utf8');
        var json = JSON.parse(data);
        setTimeout(() => {
            res.send(JSON.stringify(json, null, 4));
        }, 300);
    });

    /*
     * 拖拽列表数据
     */
    app.get('/mock/performances/DraggableDetail', function(req, res) {
        var data = fs.readFileSync('./src/mock/DraggableDetail.json', 'utf8');
        var json = JSON.parse(data);
        setTimeout(() => {
            res.send(JSON.stringify(json, null, 4));
        }, 300);
    });

    /*
     * 新增页模板数据
     */
    app.get('/mock/*/add', function(req, res) {
        var data = fs.readFileSync('./src/mock/addView.json', 'utf8');
        var json = JSON.parse(data);
        setTimeout(() => {
            res.send(JSON.stringify(json, null, 4));
        }, 300);
    });

    /*
     * 编辑页模板数据
     */
    app.get('/mock/*/edit', function(req, res) {
        var data = fs.readFileSync('./src/mock/editView.json', 'utf8');
        var json = JSON.parse(data);
        setTimeout(() => {
            res.send(JSON.stringify(json, null, 4));
        }, 300);
    });

    /*
     * 表格数据(table)
     */
    app.get('/mock/table', function(req, res) {
        var data = fs.readFileSync('./src/mock/table.json', 'utf8');
        var json = JSON.parse(data);

        var pageCount = 15;
        // 生成limit条数据
        limit = req.query.limit;
        page = req.query.page;
        var mock_config = { status: 1, data: { list: [], count: pageCount } };

        json['uid|+1'] = page * limit;

        mock_config.data['list|' + limit] = [json];


        if (pageCount >= req.query.page) {
            setTimeout(function() {
                var data = Mock.mock(mock_config);
                res.json(data);
            }, 300);
        } else {
            var data = {
                status: 0,
                message: '无数据!'
            }
            res.json(data);
        }
    });


    /*
     * 联动数据
     */
    app.get('/mock/children', function(req, res) {
        var id = req.query.id;
        var mock_config = { 'status': 1, 'data': [] };
        mock_config['data|10'] = [{
            'value|+1': 1,
            'label': '@ctitle(2,7)',
            'disable': false
        }];
        var json = Mock.mock(mock_config);

        setTimeout(() => {
            res.send(JSON.stringify(json, null, 4));
        }, 300);
    });



    /*
     * 伪装post请求
     */
    // 解析req.body
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.post('/mock/login', function(req, res) {
        if (10 > req.body.userName) {
            var data = {
                status: 1,
                data: {
                    path: '/home/goods/add',
                    query: {id: 1321},
                    accessToken: req.body.userName + 'ahkjrtklejwkjke2342sdsdj32l4k32hk',
                    avator: 'data:image/jpeg;base64,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'
                },
                message: '登陆成功!',

            };
        } else {
            var data = {
                status: 0,
                message: '登陆失败!'
            };
        }

        var json = JSON.stringify(data, null, 4);
        // 返回数据
        // setTimeout(function() {
        res.send(json);
        // }, 1000);
    });

    // resful的成功/失败

    app.all('/mock/success', function(req, res) {
        var string = fs.readFileSync('./src/mock/success.json', 'utf8');
        var obj = JSON.parse(string);
        setTimeout(() => {
            res.send(obj);
        }, obj.delay || 300);
    });

    app.all('/mock/error', function(req, res) {
        var string = fs.readFileSync('./src/mock/error.json', 'utf8');
        var obj = JSON.parse(string);
        setTimeout(() => {
            res.send(obj);
        }, obj.delay || 300);
    });

    /*伪装上传服务器*/
    app.use('/uploads', express.static('./uploads/'));
    var uploadDir = './uploads';
    var multiparty = require('multiparty');
    app.post('/mock/upload', function(req, res) {
        // 建立上传文件夹
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        var form = new multiparty.Form({ uploadDir: uploadDir });

        form.on('error', function(err) {
            console.log('Error parsing form: ' + err.stack);
        });

        form.parse(req, function(err, fields, files) {
            console.log(fields)
            console.log('@')
            console.log(files)
            var filesTmp = JSON.stringify(files, null, 2);
            if (err) {
                console.log('parse error: ' + err);
                res.send("写文件操作失败。");
            } else {
                var result = {
                    status: 1,
                    data: {
                        url: files.file[0].path,
                        id: Mock.Random.natural()
                    }
                };
                res.json(result);
            }
        });
    });

    var dir = fs.readdirSync('./src/mock/');
    dir.forEach(file=>{
        if(-1 != file.indexOf('.json')){
            var name = file.replace('.json', '');
            app.all('/mock/auto/' + name, (req, res)=> {
                var string = fs.readFileSync('./src/mock/' + file, 'utf8');
                var obj = JSON.parse(string);
                setTimeout(() => {
                    res.send(obj);
                }, obj.delay || 300);
            });
        }
    });

    console.log('Mock数据初始化完成！');
}
