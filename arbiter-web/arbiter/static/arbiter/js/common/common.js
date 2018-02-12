function deleteAllCookies() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
Date.prototype.format = function(fmt){
    var o = {
         "M+": this.getMonth()+1,
         "d+": this.getDate(),
         "H+": this.getHours(),
         "m+": this.getMinutes(),
         "s+": this.getSeconds(),
         "S+": this.getMilliseconds()
    };

    //因位date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：



    if(/(y+)/.test(fmt)){
        //第一种：利用字符串连接符“+”给date.getFullYear()+""，加一个空字符串便可以将number类型转换成字符串。

        fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
    }
    for(var k in o){
        if (new RegExp("(" + k +")").test(fmt)){

            //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。

            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
        }
    }
    return fmt;
};


/**
 * 验证是否可编辑
 * @constructor
 */
function ValidateEditWebSocket(fileName) {
    if ("WebSocket" in window) {
        let socket = new WebSocket("ws://" + window.location.host + "/arbiter/");
        socket.onmessage = function (e) {
            console.log(e.data);

        };
        socket.onopen = function () {
            //发送validateEdit 0 查询
            socket.send("validateEdit 0 " + fileName);
        };
        // Call onopen directly if socket is already open
        if (socket.readyState === WebSocket.OPEN)
            socket.onopen();
    }
    else {
        // 浏览器不支持 WebSocket
        alert("您的浏览器不支持 WebSocket!");
    }
}

/**
 * 解决csrf问题
 * @param name
 * @returns {*}
 */
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function getusername() {
    let storage = window.localStorage;
    let username = storage['username'];
    return username ? username : null;
}

let getfilePath = function (key) {
    let casepath = key.substring(key.indexOf(".") + 1);
    casepath = casepath.substring(casepath.indexOf(".") + 1);
    let pyfilepath = casepath.split(":")[0].replace(/\./g, "/") + ".py";
    return pyfilepath;
};
let topaperMap = function (caseMap) {
    let paperMap = {};
    for (let [key, value] of Object.entries(caseMap)) {
        if (typeof value !== "object") {
            let pyfilepath = getfilePath(key);
            if (!!paperMap[pyfilepath] === false) {
                paperMap[pyfilepath] = {};
            }
            paperMap[pyfilepath][key] = value;
        }
    }
    return paperMap;
};
let toAllpaperMap = function (caseMap) {
    let paperMap = {};
    for (let [key, value] of Object.entries(caseMap)) {
        if (typeof value !== "object") {
            let pyfilepath = getfilePath(key);
            if (!!paperMap[pyfilepath] === false) {
                paperMap[pyfilepath] = {};
            }
            paperMap[pyfilepath][key] = value;
        }
        else {
            for (let [k, y] of Object.entries(value)) {

                let pyfilepath = getfilePath(key);
                if (!!paperMap[pyfilepath] === false) {
                    paperMap[pyfilepath] = {};
                }
                paperMap[pyfilepath][k] = y;
            }
        }

    }
    return paperMap;
};
