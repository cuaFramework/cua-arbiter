function deleteAllCookies() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}



$(document).ready(function () {



});

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

function RunWebSocketTest() {
    let casename = getCaseName();
    if ("WebSocket" in window) {
        let socket = new WebSocket("ws://" + window.location.host + "/arbiter/");
        socket.onmessage = function (e) {
            document.getElementById("insert").innerHTML += "<li><a>" + e.data + "</a></li>";

        };
        socket.onopen = function () {
            socket.send("runCase " + casename);
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
 * 获取caseName
 * @returns {jQuery}
 */
function getCaseName() {
    return $("#casepath").attr("casepath");

}

function setBtn(type) {
    if (type === "save") {
        //设置为保存按钮状态
        let jq_edit =  $("#edit");
        jq_edit.find("span").text("保存");
         jq_edit.attr("title","保存");
        $("#save-edit-icon").text("save");
    }
    if (type === "edit") {
        //设置为保存按钮状态
        $("#edit").find("span").text("编辑");
        $("#save-edit-icon").text("mode_edit");
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

