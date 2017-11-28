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
            fetch('../wholog/getAllLog?startTime=' + startTime + '&endTime=' + endTime, {
                    method: 'get'
                }).then((response) => {
                    return response.json();
                }).then((json) => {
                    this.tableData = json['data'];
                }).catch((err) => {
                    console.log(err)
                });

        }/*queryData*/
    }
});





