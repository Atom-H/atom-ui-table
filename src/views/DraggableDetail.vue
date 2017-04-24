<template>
    <div class="d-detail">
        <div class="d-name" v-html="name"></div>
        <template v-for="(list,listindex) in dataVal">
            <h2 class="dd-title"><i class="fa fa-bar-chart fa-pos"></i><span v-html="list.title"></span></h2>
            <!--一个列表项-->
            <template v-for="(item,index) in list.listData">
                <div class="dd-list">
                    <span class="dd-index">{{index+1}}</span>
                    <span class="dd-name" v-html="item.name"></span>
                    <span class="dd-percent" v-html="item.percent"></span>
                    <span class="dd-tag" @click="showDetail(listindex,index)">{{item.tag}}<i class="fa fa-sort-desc"></i></span>
                    <div class="dd-tag-dec" v-show="index==i&&listindex==j" v-html="item.tagDetail">{{item.ratingScore}}</div>
                </div>
                <div class="dd-detail" v-html="item.detail"></div>
                <div class="dd-more" v-html="item.more"></div>
                <div class="dd-self-percent" v-if="item.ratingShow == true">
                    <div class="fl">{{item.ratingText}}</div>
                    <div class="fr">
                        <input :readonly="item.ratingEdit"
                               type="text"
                               placeholder="0"
                               v-model="item.ratingScore"
                               @keyup="numFun"
                               @blur="testNum">
                    </div>
                </div>
                <div class="dd-self-percent" v-if="item.leaderShow == true">
                    <div class="fl">{{item.leaderText}}</div>
                    <div class="fr">
                        <input :readonly="item.leaderEdit"
                               type="text"
                               placeholder="0"
                               v-model="item.leaderScore"
                               @keyup="numFun"
                               @blur="testNum">
                    </div>
                </div>
            </template>
            <div class="dd-list-total">加权合计：{{list.total}}</div>
        </template>

        <div class="dd-remark" v-if="rating">
            <h4>{{rating.title}}</h4>
            <textarea class="form-control" rows="5" v-model="rating.remark" :disabled="rating.disable">{{rating.remark}}</textarea>
        </div>
        <div class="dd-remark" v-if="leader">
            <h4>{{leader.title}}</h4>
            <textarea class="form-control" rows="5" v-model="leader.remark" :disabled="leader.disable">{{leader.remark}}</textarea>
        </div>

        <div class="dd-total" v-html="total"></div>
        <div class="wrap-drag-btn">
            <v-button v-if="btnshow" @click="submit" :disabled="btnSubmit.disabled" :loading="btnSubmit.loading" :icon="'check'" :type="'primary'">{{btnSubmit.text}}</v-button>
            <button class="backbtn" @click="backPage" v-else>返回</button>
        </div>
    </div>
</template>
<script>
    import VButton from '../../src/components/form/Button';
    export default{
        name: 'DraggableDetail',
        components: {
            VButton
        },
        created(){
            this.httpGetBaseView(response => {
                this.dataVal = response.data.data.mockData;
                this.url=response.data.data.url;
                this.query=response.data.data.query;
                this.name = response.data.data.name;
                this.total = response.data.data.total;
                this.btnshow = response.data.data.btnshow;
                this.leader = response.data.data.leader;
                this.rating = response.data.data.rating;
            });
        },
        computed:{
            inpNum:{
                get:function(){
                    return this.oldNum;

                },
                set:function(newValue){
                    this.oldNum=newValue.replace(/[^\d]/g,'');
                }
            }
        },
        methods:{
//            失去焦点的时候再验证一次
            testNum:function(e){
                //                正则验证0到100之间的正数包含小数
                var r = /^(\d{1,3}(\.\d{1,2})?|100)$/;

                if(!r.test(e.target.value)){
                    e.target.value='';
                    //alert("请输入0到100之间的数字，最多含两位小数")
                }
                else{
                    e.target.value=parseFloat(e.target.value)
                }

            },
//            输入阶段进行的验证
            numFun:function(e){
                if(parseInt(e.target.value)>=100){
                    return e.target.value=100
                }
                e.target.value=e.target.value.replace(/^[.]+/,'')
                e.target.value=e.target.value.replace(/[^0-9.]/g,'')
            },
//            返回上一页
            backPage:function(){
                this.$router.back()
//                window.history.go(-1);
            },
            showDetail(_listindex,_index){

                if(this.j==_listindex&&this.i==_index){
                    this.i=-1;
                    this.j=-1;
                }else{
                    this.j=_listindex;
                    this.i=_index;
                }
            },

            httpGetBaseView(cb) {
                var url = [API_ROOT, this.$route.path.replace('/home/', '')].join('/');
                axios.get(url,{params:this.$route.query})
                    .then((response) => {
                        cb(response);
                    })
                    .catch((error) => {
                        syslog(error);
                    });
            },
            /**
             * 提交
             */
            submit() {
                this.btnSubmit.disabled = true;
                this.btnSubmit.loading = true;
                this.btnSubmit.text = '处理中...';

                //post url后端提供
                axios.post(this.url, qs.stringify(
                    {
                        "data":this.dataVal,
                        "leader":this.leader,
                        "rating":this.rating,
                        "query":this.query,
                    }

                ))
                    .then((response) => {
                        this.btnSubmit.disabled = false;
                        this.btnSubmit.loading = false;
                        this.btnSubmit.text = '确定';

                        this.$alert(response.data.message)
                    })
                    .catch((error) => {
                        syslog(error);
                    });
            },
        },
        data(){
            return {
                i:-1,
                j:-1,
                url:"",
                query:"",
                name:"",
                total:"",
                btnshow:true,
                leader:{
                    title:'',
                    disable: true,
                    remark: ''
                },
                rating:{
                    title:'',
                    disable: true,
                    remark: ''
                },
                backData:'',
                btnSubmit: {
                    disabled: false,
                    loading: false,
                    text: '确定'
                },
                dataVal:{}
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .d-detail{
        padding: 5px 20px 0;
        .d-name{
            text-align: center;
            font-size: 18px;
            height: 50px;
            margin-bottom: 20px;
            line-height: 50px;
        }
        h2{ margin: 0 !important;}
        .fa-pos{
            font-size: 16px;
            color: #333;
            margin-right: 10px
        }
        .dd-title{
            font-size: 18px;
            height: 50px;
            line-height: 50px;
            color: #666;
        }
        .dd-list{
            line-height: 26px;
            padding-bottom: 20px;
            position: relative;
            border-top: 1px dashed #e8e8e8;
            padding-top: 10px;
            span{
                display: inline-block
            }
            .dd-index{
                color: #666;
                font-size: 14px;
                margin-right: 10px
            }
            .dd-name{
                color: #333
            }
            .dd-percent{
                padding: 0 5px;
                color: #fff;
                font-size: 12px;
                background: #ddd;
                border-radius: 4px
            }
            .dd-tag{
                position: absolute;
                right: 0;
                top: 0;
                color: #666;
                cursor: pointer;
                .fa{
                    position: relative;
                    top:-3px;
                    margin-left: 5px;
                }
            }
            .dd-tag-dec{
                position: absolute;
                right: 0;
                top: 28px;
                /*display: none;*/
                border-radius: 5px;
                border:1px solid #ddd;
                padding: 10px 10px 2px;
                line-height: 20px;
                color: #666;
            }
        }
        .dd-detail,.dd-more{
            color: #888;
            width: 800px;
            line-height: 24px;
        }
        .dd-more{
            margin-top: 10px;
            margin-bottom:10px;
            color: #333;
        }
        .dd-self-percent{
            width: 200px;
            height: 40px;
            border-radius: 4px;
            border: 1px solid #ddd;
            margin: 10px 0 20px;
            .fl{
                float: left;
                height: 40px;
                line-height: 40px;
                width: 80px;
                text-align: center;
                color: forestgreen;
                font-size: 16px;
                border-right: 1px solid #ddd;
            }
            .fr{
                float: left;
                height: 40px;
                width: 106px;
                input{
                    height: 38px;
                    width: 116px;
                    padding: 0 5px;
                }
            }
        }
        .dd-list-total{
            text-align: right;
            height: 40px;
            line-height: 40px;
            color: #333;
            border:1px solid #e8e8e8;
            padding-right: 20px;
            margin-bottom: 20px;
            font-size: 16px;
        }
        .dd-total{
            text-align: center;
            padding-top: 80px;
            padding-bottom: 40px;
            font-size: 24px;
            /*font-weight: bold;*/
        }
        .wrap-drag-btn{
            clear: both;
            text-align: center;
            margin-bottom: 40px;
            a{
                background: #14bb9d !important;
                border: 1px solid #14bb9d !important;
            }
        }
        .drag-btn{
            font-size: 14px;
            background: #14bb9d;
            color: #fff;
            height: 40px;
            width: 100px;
            transition: opacity .3s;
            &:hover{
                opacity: .8;
            }
        }
        .backbtn{
            background: #14bb9d !important;
            border: 1px solid #14bb9d !important;
            width: 72px;
            height: 34px;
            color: #fff;
            border-radius: 4px;
        }
    }
</style>