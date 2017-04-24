<template>
    <div class="view-ranking">
        <div class="r-title">{{title}}</div>
        <transition-group name="no" type="transition" class="drap-wrap" tag="ul" ref='myUl'>
            <li v-for="(item, index) in lists" :key="item.id">
                <div class="col-md-10">
                    <div class="ranking-number">No.{{index+1}}</div>
                    <img :src="item.avatar" class="avarar">
                    <div class="user-info">
                        <p>{{item.name}}</p>
                        <p>{{item.dept}}</p>
                        <p>{{item.position}}</p>
                    </div>
                </div>
                <div class="col-md-2" v-html="item.medal"></div>
            </li>
        </transition-group>
    </div>
</template>
<script>
export default {
    name: 'PerformancesRanking',

    created(){
        this.httpGetBaseView(response => {
            this.lists = response.data.data.lists;
            this.title = response.data.data.title;
        });
    },
    methods:{
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
    },

    data() {
        return {
            lists: [],
            title: '',
            message: '',
            status: 0,
            data: {
                title:'',
                lists: {
                    id:0,
                    avatar:'',
                    name:'',
                    dept:'',
                    position:'',
                    medal:''
                }
            }
        }
    },

    computed: {

    },

    components: {

    }
}
</script>
<style scope lang="scss">
    .view-ranking{
        padding: 5px 20px 0;
        .r-title{
            text-align: center;
            font-size: 22px;
            height: 50px;
            margin-bottom: 20px;
            line-height: 50px;
        }
        img{
            border:0px;
        }
        ul.drap-wrap{
            border:1px solid #e6e6e6;
            border-radius: 5px;
            padding:10px 0px;
            li{
                padding:15px 10px;
                border-bottom: 1px dashed #e6e6e6;
                overflow: hidden;
                .ranking-number{
                    float:left;
                    width:100px;
                    line-height: 60px;
                    text-align:center;
                    font-size:24px;
                    color:#999;
                    font-family: "Times New Roman";
                }
                span.medal, img.medal{
                    display: block;
                    width:60px;
                    height:60px;
                    text-align: center;
                    line-height:60px;
                    font-size:22px;
                }
                img.avarar{
                    border:1px solid #e6e6e6;
                    -webkit-border-radius: 15px;
                    -moz-border-radius: 15px;
                    border-radius: 15px;
                    width:60px;
                    height:60px;
                    float:left;
                    background:#fff;
                }
                .user-info{
                    float:left;
                    margin-left:10px;
                    p{
                        color: #999;
                        padding:0px;
                        margin:0px;
                    }
                    p:first-child{
                        color:#000;
                        font-weight: bold;
                        font-size:16px;
                    }
                }
                .right-info{
                    text-align: right;
                }
            }

            li:nth-child(1){
                .ranking-number{color:red;font-size:30px;}
            }
            li:nth-child(2){
                .ranking-number{color:orange;font-size:28px;}
            }
            li:nth-child(3){
                .ranking-number{color:green;font-size:26px;}
            }
            li:hover{
                background:#f9f9f9;
            }
            li:last-child{
                border-bottom:0px;
            }
        }
    }
</style>
