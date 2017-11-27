
var app = new Vue({
    el: '#main',
    data: {
            api_name:null,
            total:null,
            creat_time:["2017-01-01","2016-01-01 10:00:00","2017-01-01","2018-01-01","2017-01-01","2018-01-01","2017-01-01","2018-01-01","2017-01-01","2018-01-01"],
            consume_time:["10","25","19","10","35","19","10","45","19","55"],
            case_name:["id09283837371","id09283837372","id09283837373","id09283837374","id09283837375","id09283837376","id09283837377","id09283837378","id09283837379","id09283837310"],

    },
    methods:{
        search() {
            if (this.api_name!==null){
                fetch('../wholog/query-api-data/?api_name='+this.api_name,{
                    method:'get'
                }).then( (response)=>{
                    return response.json();
                }).then((json) => {
                    this.time = json['data']['time'];
                    this.total = json['data']['total'];
                }).catch((err)=>{
                    console.log(err)
                });
            }else {
                alert("请先输入要查询的内容");
            }
        },
            draw(){
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: "api请求情况",
                    subtext: "纯属虚构"
                },
                tooltip: {
                    trigger: "axis",

                    formatter: (params)=> {
                        var result = '';
                        params.forEach( (item)=> {
                            result += '<p>' + item.seriesName + ':' + item.data + '</p>' + '<br/>' +
                                      '<p>' + "用例名:" + ':' + this.case_name[item.dataIndex] + '</p>' + '<br/>'+
                                      '<p>' + "请求时间:" + ':' + this.creat_time[item.dataIndex] + '</p>' + '<br/>'
                                        ;
                        });

                        return result;
                    }
                    },
                legend: {
                    data: ["耗时"]
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true
                        },
                        magicType: {
                            show: false,
                            type: ["line", "bar", "stack", "tiled"]
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [
                    {   name:"耗时",
                        type: "category",
                        boundaryGap: false,
                        data:this.creat_time,
                        nameLocation: "end"
                    }
                ],
                yAxis: [
                    {
                        name:"时间",
                        type: "value",
                        axisLabel: {
                        formatter: '{value} ms'
                    }
                    }
                ],
                series: [
                    {
                        name: "耗时",
                        type: "line",
                        smooth: true,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: "default"
                                }
                            }
                        },
                        data: this.consume_time
                    }
                ]
        };

            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(option);
      },
    },
    watch:{  //数据变化时自动重画，在控制台修改message,会自动重画
         message: ()=>{
         this.draw();
         }
      },
    mounted(){
    this.$nextTick(()=> {
        this.myChart = echarts.init(document.getElementById('main-chart'));  //初始化echarts实例
        this.draw();
        this.myChart.on('click', (params)=> {
             alert(this.case_name[params.dataIndex]);
         });
    })
    }
});


