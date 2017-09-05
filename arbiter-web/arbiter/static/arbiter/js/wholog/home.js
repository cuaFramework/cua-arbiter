/**
 * Created by Administrator on 2017/8/6.
 */

$(document).ready(function() {

    /*设置默认值*/
    setDefaultDateTime();
    /**/
    var startDate = $('#start-date').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        format: 'yyyy-mm-dd',
        today: '今天',
        clear: '清除',
        close: '确定',
        closeOnSelect: false, // Close upon selecting a date,
    });
    /*时间选择*/
    var startTime = $('#start-time').pickatime({
        default: '', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: '确定', // text for done-button
        cleartext: '清除', // text for clear-button
        canceltext: '取消', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: false, // make AM PM clickable
        aftershow: function () {
        } //Function for after opening timepicker
    });
    /**/
    var endDate = $('#end-date').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        format: 'yyyy-mm-dd',
        today: '今天',
        clear: '清除',
        close: '确定',
        closeOnSelect: false, // Close upon selecting a date,
    });

    /*时间选择*/
    var endTime = $('#end-time').pickatime({
        default: '', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        format: 'hh:mm',
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: '确定', // text for done-button
        cleartext: '清除', // text for clear-button
        canceltext: '取消', // Text for cancel-button
        autoclose: true, // automatic close timepicker
        ampmclickable: false, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
    });

    var xmlHttp;
    function createXMLHttpRequest() {
        if (window.ActiveXObject)
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        else if (window.XMLHttpRequest)
            xmlHttp = new XMLHttpRequest();
    }
    function startRequest() {
        createXMLHttpRequest();
        xmlHttp.open('GET', '../wholog/search?author=hui', true);  //GET发送数据的方式
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)//判断返回码
                /*连接成功，设置数据*/
                loadData(JSON.parse(xmlHttp.responseText))
        };
        xmlHttp.send(null);                                    //GET发送的内容不再send(）中
    }
    $("#search-btn").click(function () {
        //加载数据
        loadData();

    });


});/*ready end*/
function getCurrentTime() {
     var current = new Array();
     var currentTime = new Date();

    current[0] = currentTime.getFullYear();
    current[1] = currentTime.getMonth()+1;//0-11,要+1
    current[2] = currentTime.getDate();
    return current;
}

function setDefaultDateTime() {        /*设置默认日期和时间*/
    startDate = getDefaultDateTime()[0];
    endDate = getDefaultDateTime()[1];
    $('#start-date').val(startDate);
    $('#end-date').val(endDate);

    $('#start-time').val('00:00');
    $('#end-time').val('00:00');

}
function getDefaultDateTime() {
    var currentDate = getCurrentTime();
    var startDate = currentDate[0]+'-'+currentDate[1]+'-'+currentDate[2];
    var endDate = currentDate[0]+'-'+currentDate[1]+'-'+(currentDate[2]+1);
    var defaultDate = new Array;
    defaultDate[0] = startDate;
    defaultDate[1] = endDate;
    return defaultDate;

}
//获取开始时间，2017-09-07 18:07
function getStartTime() {
    var date =  $('#start-date').val();
    var time =  $('#start-time').val();
    if (date == "" || date == undefined || date == null){
        date = getDefaultDateTime()[0];
    }
    if (time == "" || time == undefined || time == null){
        time = getDefaultDateTime()[1];
    }
    return date+" " + time;
}
//获取开始时间，2017-09-07 18:07
function getEndTime() {
    var date =  $('#end-date').val();
    var time =  $('#end-time').val();
    if (date == "" || date == undefined || date == null){
        date = getDefaultDateTime()[0];
    }
    if (time == "" || time == undefined || time == null){
        time = getDefaultDateTime()[1];
    }
    return date+" " + time;
}
//获取查询关键字
function getKeyWords() {
    return $('#key_name').val();
}

function loadData() {
     /*init datatables*/

     var logtable = $('#tb-log').DataTable({
         destroy: true,
         dom: 'lrtip',
         //开启服务端模式
         serviceSide:true,
         paging: true,
         lengthChange: false,//是否允许改变每页显示记录数
         processing: true,//载入数据的时候是否显示
         searching: true,
         pagingType: "full_numbers",
         columns: [
            { data: 'fields.log_id' },
            { data: "fields.case_name" },
            { data: "fields.author" },
            { data: "fields.run_time" }
         ],
         columnDefs: [{
                //   指定第四列，从0开始，0表示第一列，1表示第二列……
                "targets": 4,
                "data": 'fields.log_id',
                "orderable": false,
                "width": "10%",
                "render": function(data, type, row, meta) {
                    //替换所有-
                    logIdData = data.replace(/\-/g,"");

                     // return data = '<button class="btn btn-info btn-sm" data-id=' + data + '><i class="fa fa-pencil"></i>Edit</button>';
                     return data ='<a href="../wholog/logDetail?logId='+logIdData+'" class="waves-effect waves-light btn">查看</a>'
                }
            }],
        //使用ajax请求
         ajax:{
             type:'GET',
             url:'../wholog/getAllLog',
             data:{'startTime':getStartTime(),'endTime':getEndTime(),'keyWords':getKeyWords()},
             dataType:'json',
             dataSrc: ''
         },

         language: {
                'emptyTable': '没有数据',
                'loadingRecords': '加载中...',
                'processing': '查询中...',
                'search': '检索:',
                'lengthMenu': '每页 _MENU_ 条',
                'zeroRecords': '暂无数据',
                'paginate': {
                    'first':      '首页',
                    'last':       '最后页',
                    'next':       '',
                    'previous':   ''
                },
                'info': '第 _PAGE_ 页 / 总 _PAGES_ 页',
                'infoEmpty': '没有数据',
                'infoFiltered': '(过滤总条数 _MAX_ 条)'
            }
     });/*table end*/
 // Apply the search
    $('#log_search_input').on( 'keyup', function () {
        logtable.search( this.value ).draw();
    } );

}/*load Data end*/






