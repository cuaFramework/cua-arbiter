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
