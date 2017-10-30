function getusername() {
    let storage = window.localStorage;
    let username = storage['username'];
    return username ? username : null;
}

let Event = new Vue();
let username = getusername();
let casefullname = null;
let run_socket = new WebSocket("ws://" + window.location.host + "/arbiter/");

Vue.component('navbar_app', {
    template: '#arbiterNavbar'
    , data: function () {
        return {
            message: {
                username: username,
                href: 'login',
            },
            userMenuTrigger: null,
            userMenuOpen: false,
            appMenuTrigger: null,
            appMenuOpen: false,
            dialog: false,
            gitUrlPrefix: '',
            gitCloneStatus: 'finish',
            sliderIsOpen: true,
        }

    },
    mounted() {
        this.appMenuTrigger = this.$refs.appIcon.$el;
        if (!!this.$refs.UserAvatar) {
            this.userMenuTrigger = this.$refs.UserAvatar.$el;
        }

    },
    methods: {
        userMenuToggle() {
            this.userMenuOpen = !this.userMenuOpen
        },
        userMenuHandleClose(e) {
            this.userMenuOpen = false
        },
        appMenuToggle() {
            this.appMenuOpen = !this.appMenuOpen
        },
        appMenuHandleClose(e) {
            this.appMenuOpen = false
        },
        logout() {
            deleteAllCookies();
            let storage = window.localStorage;
            storage.clear();
            window.location.href = ".";

        },
        openImportDialog() {
            this.dialog = true;

        },
        closeImportDialog() {
            this.dialog = false
        },
        cloneCaseObj() {
            this.gitCloneStatus = 'running';

            fetch("./cloneCaseObj",
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({url: this.gitUrlPrefix})
                }).then((response) => {


                if (response.status !== 200
                ) {
                    console.log("存在一个问题，状态码为：" + response.status);
                    const error = new Error(response.statusText);
                    error.response = response;
                    this.gitCloneStatus = 'fail';
                    throw error;
                }
                else
                    return response.json();
            }).then(
                json => {
                    this.gitCloneStatus = 'finish';
                    window.location.href = ".";


                });
        },
        toggleSlide() {
            this.sliderIsOpen = !this.sliderIsOpen;
            Event.$emit('toggle-slide');
        }
    }

});

Vue.component('slide_app', {
    template: '#arbiterNavSlide'
    ,
    data() {

        this.$http.post("./getCaseList").then(function (response) {
            if (response.status !== 200
            ) {
                console.log("存在一个问题，状态码为：" + response.status);
                return false;
            }
            else
                return response.json();
        }).then(
            function (json) {
                this.modelList = json;
                document.getElementsByTagName("body")[0].style.display = "";
            });

        return {
            open: true,
            docked: true,
            modelList: {},
            value: ""
        }
    },
    mounted() {
        let _this = this;
        Event.$on('toggle-slide', function () {
            _this.open = !_this.open;
        });


    },
    methods: {
        handleChange(val) {
            this.value = val;
        },

        toggle() {
            this.open = !this.open;
        },
        loadAllCasePaper(caseMap) {
            let paperMap = {};
            let casepath = null;
            for (let [key, value] of Object.entries(caseMap)) {
                if (typeof value !== "object") {
                    let casepath = key.substring(key.indexOf(".") + 1);
                    casepath = casepath.substring(casepath.indexOf(".") + 1);
                    let pyfilepath = casepath.split(":")[0].replace(/\./g, "/") + ".py";
                    if (!!paperMap[pyfilepath] === false) {
                        paperMap[pyfilepath] = {};
                    }
                    paperMap[pyfilepath][key] = value;
                }
                else {
                    for (let [k, y] of Object.entries(value)) {
                        let casepath = k.substring(k.indexOf(".") + 1);
                        casepath = casepath.substring(casepath.indexOf(".") + 1);
                        let pyfilepath = casepath.split(":")[0].replace(/\./g, "/") + ".py";
                        if (!!paperMap[pyfilepath] === false) {
                            paperMap[pyfilepath] = {};
                        }
                        paperMap[pyfilepath][k] = y;

                    }
                }

            }
            Event.$emit('change-paper', paperMap);
            //casepaper_app.caseMap = paperMap;

        },
        loadCasePaper(caseMap) {
            console.log("xxx")
            let paperMap = {};
            let casepath = null;
            for (let [key, value] of Object.entries(caseMap)) {
                if (typeof value !== "object") {
                    let casepath = key.substring(key.indexOf(".") + 1);
                    casepath = casepath.substring(casepath.indexOf(".") + 1);
                    let pyfilepath = casepath.split(":")[0].replace(/\./g, "/") + ".py";
                    if (!!paperMap[pyfilepath] === false) {
                        paperMap[pyfilepath] = {};
                    }
                    paperMap[pyfilepath][key] = value;
                }
            }
            Event.$emit('change-paper', paperMap);
            //casepaper_app.caseMap = paperMap;
        },
        loadCaseFile(casePath) {
            //guide 显示到隐藏，root-case从隐藏到显示
            casefullname = casePath;
            //设置标题显示用例类名+方法名
            let caseclassname = casefullname.split(":")[1];
            //读取用例文件,并设置codeContent
            let caseNamePathList = casefullname.split("/");//获取用例路径，解析内容
            let caseNamePath = caseNamePathList[caseNamePathList.length - 1].split(":")[0].split(".").join("/") + ".py";
            document.getElementById("code-content").style.fontSize = "14px";
            let codeContent = ace.edit("code-content");
            codeContent.setTheme("ace/theme/github");
            codeContent.setReadOnly(true);//设置只读
            codeContent.$blockScrolling = Infinity;
            codeContent.session.setMode("ace/mode/python");
            // setBtn("edit");
            /*查询可编辑状态*/
            new ValidateEditWebSocket(caseNamePath);
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/static/' + caseNamePath, true);
            xhr.setRequestHeader("If-Modified-Since", "0");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    codeContent.setValue(xhr.responseText, -1);//设置显示内容，并将光标移动到start处
                    Event.$emit('flush-fab');
                }
            };
            xhr.send(null);
        }
    }
});
Vue.component('code_float_btn', {
    template: '#codeFloatBtn',
    data: function () {
        return {
            modalShow: true,
            seen: false,
            editIcon: "mode_edit",
            saveDialog: false,
            logDialog: false,
            saveStatus: 'finish',
            casefullname: '',
            logContent: [],
        }
    }, mounted() {
        let _this = this;
        Event.$on('flush-fab', function () {
            _this.editIcon = "mode_edit";
            _this.logContent = [];
            _this.modalShow = true;
        });
             Event.$on('run-case', function (casefullname) {
            _this.casefullname = casefullname;
            _this.run();
        });

    },
    methods: {
        openSaveDialog() {
            this.saveDialog = true;

        },
        openLogDialog() {
            this.logDialog = true;

        },
        closeLogDialog() {
            this.logDialog = false
        },
        onMouseEnterCodeFAB() {
            this.seen = true;
        },
        onMouseleaveCodeFAB() {
            this.seen = false;
        },
        log() {
            this.logDialog = true;
        },
        cleanLog() {
            this.logContent = [];
        },
        run() {
            if (username === null) {
                window.location.href = "login";
            }
            else {
                run_socket.onmessage = (res) => {
                    this.logContent.push(res.data);
                    //   document.getElementById("insert").innerHTML += "<div><p>" + e.data + "</p></div>";

                };
                run_socket.onopen = () => {
                    run_socket.send("runCase " + this.casefullname);
                };
                // Call onopen directly if socket is already open
                if (run_socket.readyState === WebSocket.OPEN)
                    run_socket.onopen();
            }
            this.logDialog = true;
        },
        edit() {
            if (username === null) {
                window.location.href = "login";
            }
            let codeContent = ace.edit("code-content");
            if (this.editIcon === "mode_edit") {

                codeContent.setReadOnly(false);//设置为可编辑模式
                codeContent.setTheme("ace/theme/chrome");//设置可编辑状态主题
                this.editIcon = "save";
            }
            else if (this.editIcon === "save") {

                this.saveStatus = "running";
                this.saveDialog = true;
                let newCodeContent = codeContent.getValue();
                fetch("/arbiter/save/",
                    {
                        method: "POST",
                        credentials: "same-origin",
                        headers: {
                            "X-CSRFToken": getCookie("csrftoken"),
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({casepath: this.casefullname, content: newCodeContent})
                    }).then((response) => {
                    if (response.status !== 200) {
                        console.log("请求失败，状态码为：" + response.status);
                        deleteAllCookies();
                        window.location.href = "login";
                        return;
                    }
                    //检查响应文本
                    response.json().then((data) => {
                        if (data['result'] === "ok") {
                            this.editIcon = "mode_edit";
                            this.saveDialog = false;

                        } else {
                            alert("保存失败！");
                        }
                    });
                }).catch((err) => {
                    console.log("Fetch错误:" + err);

                })
            }

        }
    }
});
Vue.component('case_paper', {
    template: '#casePaper',
    data() {
        return {caseMap: {}}
    },
    mounted() {
        let _this = this;
        Event.$on('change-paper', (caseMap) => {
            _this.caseMap = caseMap;
        });
    }
    ,
    methods: {

        run(testcase) {
            Event.$emit('run-case',testcase);

        }
    }
});

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Hello }, // No props, no nothing
    { path: '/hello/:name', component: Hello, props: true }, // Pass route.params to props
    { path: '/static', component: Hello, props: { name: 'world' }}, // static values
    { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn }, // custom logic for mapping between route and props
    { path: '/attrs', component: Hello, props: { name: 'attrs' }}
  ]
});

let navbar_app = new Vue({
    router,
    el: '#app',
});



new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route props</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/hello/you">/hello/you</router-link></li>
        <li><router-link to="/static">/static</router-link></li>
        <li><router-link to="/dynamic/1">/dynamic/1</router-link></li>
        <li><router-link to="/attrs">/attrs</router-link></li>
      </ul>
      <router-view class="view" foo="123"></router-view>
    </div>
  `
})
