/**
 * Created by Administrator on 2017/11/19.
 */


var log_app = new Vue({
    el: '#log-root',
    data: {
        startDate:"2017-10-27",
        startTime:'00:00',
        endDate:'2017-11-28',
        endTime:'23:59',
        tableData: null,
    },

    /*方法*/
    methods:{
        queryData(){
            startTime = this.startDate + " " + this.startTime;
            endTime = this.endDate + " " + this.endTime;

            fetch('../wholog/getAllLog',
                {
                    method: 'POST',
                    credentials:"same-origin",
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken"),
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({startTime:startTime,endTime:endTime})
                }).then((response) => {
                    /*判断请求状态码*/
                    if (response.status !== 200){
                        console.log("请求失败，状态码为：" + response.status);
                        return;
                    }else {
                        return response.json();
                    }
                }).then((json) => {
                    /*给tableData赋值*/
                    this.tableData = json['data'];
                }).catch((err) => {
                    console.log("请求wholog/getAllLog出错：" + err);
                });

        }/*queryData*/
    }
});





