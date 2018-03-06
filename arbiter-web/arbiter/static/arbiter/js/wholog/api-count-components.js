/**
 * 接口统计
 */

const ApiCountApp = {
    template: '#apiCountApp',
    store,
    data: function () {
        return {
            api_name: null,
            total: null,
            apiData: {},
            logDialog: {
                menus: [],
                content: [],
                switch: false,
            }

        }
    },
    methods: {
         /*存到vuex map 方便调用store里函数*/
         ...Vuex.mapMutations(['setusername', 'refreshJwtToken',]),
        ...Vuex.mapGetters(['username', 'jwtHeader']),
        queryData() {
            if (this.api_name !== null) {
                fetch('../wholog/query-api-data/?api_name=' + this.api_name, {
                    method: 'get'
                }).then((response) => {
                    return response.json();
                }).then((json) => {
                    this.apiData = json['data'];
                    if (json['status'] == "true") {
                        console.log("重新开始draw")
                        this.draw();
                    } else {
                        console.log(json['msg']);
                    }
                }).catch((err) => {
                    console.log(err)
                });
            } else {
                alert("请先输入要查询的内容");
            }
        },
        //echarts绘制方法
        draw() {
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: "api请求情况",
                    subtext: "纯属虚构"
                },
                tooltip: {
                    trigger: "axis",
                    formatter: (params) => {
                        var result = '';
                        params.forEach((item) => {
                            result +=
                                '<p>' + "耗时:" + this.apiData.consume_time[item.dataIndex] + "ms" + '</p>' + '<br/>' +
                                '<p>' + "用例名:" + this.apiData.case_name[item.dataIndex] + '</p>' + '<br/>' +
                                '<p>' + "请求时间:" + this.apiData.create_time[item.dataIndex] + '</p>' + '<br/>' +
                                '<p>' + "请求类型:" + this.apiData.request_type[item.dataIndex] + '</p>' + '<br/>' +
                                '<p>' + "返回Code:" + this.apiData.response_code[item.dataIndex] + '</p>' + '<br/>'
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
                    {
                        name: "时间",
                        type: "category",
                        boundaryGap: false,
                        data: this.apiData.create_time,
                        nameLocation: "end"
                    }
                ],
                yAxis: [
                    {
                        name: "耗时",
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
                        data: this.apiData.consume_time
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            this.myChart.setOption(option);
        },


        //todo 登录提示
        /*查询对应记录下的详细运行日志记录*/
        queryDetailData(logId) {
            /*对logId进行处理兼容es*/
            logId = logId.replace(/\-/g, "");
            fetch('../wholog/queryLogData',
                {
                    method: 'POST',
                    credentials: "same-origin",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'Authorization': "JWT "+this.jwtHeader()
                    },
                    body: JSON.stringify({logId: logId})
                }).then((response) => {
                /*判断请求状态码*/
                if (response.status !== 200) {
                    if (response.status === 401) {
                        this.openLoginPopup();
                        /*判断未登录时 去打开登录提示*/
                    } else {
                        console.log("请求失败，状态码为：" + response.status);
                    }
                    return;
                } else {
                    return response.json();
                }
            }).then((json) => {
                console.log("请求成功，打开dialog");
                this.logDialog.menus = json['data'];
                this.openDialog();
            }).catch((err) => {
                console.log("请求wholog/queryLogData出错：" + err);
            });

        }, /*queryDetailData end*/

        /*打开和关闭日志运行详情对话框*/
        openDialog() {
            this.logDialog.switch = true;
        },
        closeDialog() {
            this.logDialog.switch = false;
        },

    },

    watch: {  //数据变化时自动重画，在控制台修改message,会自动重画
        message: () => {

            this.draw();
        }
    },
    mounted() {
         this.refreshJwtToken();
        this.$nextTick(() => {
            this.myChart = echarts.init(document.getElementById('main-chart'));  //初始化echarts实例
            this.draw();
            this.myChart.on('click', (params) => {
                //打开对话框，查询数据
                this.openDialog();
                this.queryDetailData(this.apiData.log_id[params.dataIndex]);
            });
        })
    },

};