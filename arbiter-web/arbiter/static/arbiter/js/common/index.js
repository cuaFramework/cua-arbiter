//所有用到的组件
let Event = new Vue();

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
