function deleteAllCookies() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


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

