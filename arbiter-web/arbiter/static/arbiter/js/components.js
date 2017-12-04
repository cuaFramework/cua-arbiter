//所有用到的组件
let Event = new Vue();
let run_socket = new WebSocket("ws://" + window.location.host + "/arbiter/");
//****以下为所有用到的组件：
//用户图标和其下拉菜单组件
const userAvatar = {
    template: '#userAvatar',
    store,
    props: {usernameAbbreviation: null},
    data: function () {
        return {
            userMenuTrigger: null,
            userMenuOpen: false,
        }
    },
    mounted() {
        this.userMenuTrigger = this.$refs.UserAvatar.$el;
    },
    methods: {
        ...Vuex.mapMutations(['setusername', 'refreshJwtToken',]),
        userMenuToggle() {
            this.userMenuOpen = !this.userMenuOpen
        },
        userMenuHandleClose(e) {
            this.userMenuOpen = false
        }, logout() {
            deleteAllCookies();
            let storage = window.localStorage;
            storage.clear();
            this.setusername(null);
            this.refreshJwtToken();
        },
    }
};
//菜单图标和其下拉菜单组件
const menuIconButton = {
    template: '#menuIconButton', store,
    props: {usernameAbbreviation: null},
    data: function () {
        return {
            appMenuTrigger: null,
            appMenuOpen: false,
            dialog: false,
            gitUrlPrefix: '',
            gitCloneStatus: 'finish',
        }
    },
    mounted() {
        this.appMenuTrigger = this.$refs.appIcon.$el;
    },
    methods: {
        ...Vuex.mapMutations(['setusername', 'refreshJwtToken',]),
        ...Vuex.mapGetters(['username', 'jwtHeader']),
        appMenuToggle() {
            this.appMenuOpen = !this.appMenuOpen
        },
        appMenuHandleClose(e) {
            this.appMenuOpen = false
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
                        'Content-Type': 'application/json',
                        'Authorization': this.jwtHeader()
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
    }
};
//顶部bar组件
const ArbiterNavbar = {
    template: '#arbiterNavbar',
    store,
    computed: {
        usernameAbbreviation() {
            if (!!this.username()) {
                return this.username().substr(0, 2)
            }
            else
                return null;
        }
    },
    data: function () {
        return {
            message: {
                href: 'login',
            },
            sliderIsOpen: true,
        }
    },
    mounted() {
        this.refreshJwtToken();

        fetch("/arbiter/getUserDetail",
            {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': this.jwtHeader()
                }
            }).then(response => {
            if (response.status !== 200) {
                console.log("存在一个问题，状态码为：" + response.status);
                return false;
            }
            else
                return response.json();
        }).then(
            json => {
                let storage = window.localStorage;
                storage["username"] = json["username"];
                storage["role"] = json["role"];
                // this.$store.commit('setusername', json["username"]);
                this.setusername(json["username"]);

            }
        ).catch((err) => {
            console.log("请求错误:" + err);
        });
    },
    methods: {
        ...Vuex.mapMutations(['setusername', 'refreshJwtToken',]),
        ...Vuex.mapGetters(['username', 'jwtHeader']),
        toggleSlide() {
            this.sliderIsOpen = !this.sliderIsOpen;
            Event.$emit('toggle-slide');
        }
    },
    components: {        //要把组件写入到components里面，如果没有放的话在切换的时候就会找不到 组件
        'userAvatar': userAvatar,
        'menuIconButton': menuIconButton,
    }

};
//侧边菜单组件
const ArbiterSlide = {
    props: {modelList: {}},
    template: '#arbiterNavSlide',
    data() {
        return {
            open: true,
            docked: true,
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
        loadCasePaper(casemodel) {
            this.$router.push({name: 'casepath', params: {casemodel: casemodel}});
        },

    }
};
//py文件paper中的fab组件
const CodeFloatBtn = {
    template: '#codeFloatBtn', store,
    props: {
        pypath: null,
        casemodel: null

    },
    data: function () {
        return {
            modalShow: true,
            seen: false,
            editIcon: "mode_edit",
            saveDialog: false,
            logDialog: false,
            saveStatus: 'finish',
            logContent: [],
            path: null
        }
    }, mounted() {
        this.path = this.pypath;

    },
    methods: {
        ...Vuex.mapMutations(['setusername', 'refreshJwtToken',]),
        ...Vuex.mapGetters(['username', 'jwtHeader']),
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
        edit() {
            let codeContent = ace.edit("code-paper");
            if (this.editIcon === "mode_edit") {

                codeContent.setReadOnly(false);//设置为可编辑模式
                codeContent.setTheme("ace/theme/chrome");//设置可编辑状态主题
                this.editIcon = "save";
            }
            else if (this.editIcon === "save") {
                let caseNamePath = null;
                for (let [k, v] of Object.entries(this.path)) {
                    if (k) {
                        caseNamePath = k;
                        break;
                    }
                }

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
                            'Content-Type': 'application/json',
                            'Authorization': this.jwtHeader()
                        },
                        body: JSON.stringify({casepath: caseNamePath, content: newCodeContent})
                    }).then((response) => {
                    if (response.status !== 200) {
                        console.log("请求失败，状态码为：" + response.status);
                        deleteAllCookies();
                        window.location.href = "/arbiter/login";
                        return;
                    }
                    //检查响应文本
                    response.json().then((data) => {
                        if (data['result'] === "ok") {
                            this.editIcon = "mode_edit";
                            let codeContent = ace.edit("code-paper");
                            codeContent.setReadOnly(true);//设置为不可编辑模式
                            this.saveDialog = false;
                            this.$router.push({name: 'casepath', params: {casemodel: this.casemodel}});

                        } else {
                            alert("文件保存失败！");
                        }
                    });
                }).catch((err) => {
                    console.log("Fetch错误:" + err);
                })
            }
        }
    }
};
//用例列表中的fab组件
const CaseFloatBtn = {
    template: '#caseFloatBtn',
    data: function () {
        return {
            modalShow: true,
            seen: false,
            testcase: "",
            logDialog: false,
            logContent: [],
        }
    }, mounted() {
        let _this = this;
        Event.$on('run-case', function (testcase) {

            _this.testcase = testcase;
            _this.run();
        });

    },
    methods: {

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

                run_socket.onmessage = (res) => {
                    this.logContent.push(res.data);
                    //   document.getElementById("insert").innerHTML += "<div><p>" + e.data + "</p></div>";

                };
                run_socket.onopen = () => {
                    run_socket.send("runCase " + this.testcase);
                };
                // Call onopen directly if socket is already open
                if (run_socket.readyState === WebSocket.OPEN)
                    run_socket.onopen();

            this.logDialog = true;
        }
        ,
        add() {

        },
    }
};
//py文件的paper组件
const CodePaper = {
    props: {pypathx: null,},
    data: function () {
        return {path: null}
    },
    template: '#codePaper',
    mounted() {

        this.path = this.pypathx;
        if (!!this.path) {
            for (let [k, v] of Object.entries(this.path)) {
                if (k) {
                    caseNamePath = k;
                    break;
                }
            }
            caseNamePath = caseNamePath.split(":")[0];
            this.path = caseNamePath.split(".").join("/") + ".py";

            this.loadCaseFile(this.path)
        }

    }
    ,
    methods: {
        showcode(key, value) {
            this.$router.push({name: 'casepathpy', params: {pyname: key}});
            let caseNamePath = null;

            for (let [k, v] of Object.entries(value)) {
                caseNamePath = k;
            }
            caseNamePath = caseNamePath.split(":")[0];
            this.path = caseNamePath.split(".").join("/") + ".py";

        },
        loadCaseFile(caseNamePath) {

            //  document.getElementById("codecontent").style.fontSize = "14px";
            // document.getElementById("codecontent").style.height = "600px";
            let codeContent = ace.edit(this.$el);
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
                }
            };
            xhr.send(null);
        }

    }
};
//每个case的paper组件
const CasePaper = {
    props: {casemodel: "", pyname: ""},store,
    template: '#casePaper',
    components: {
        'CodePaper': CodePaper,
        'CodeFloatBtn': CodeFloatBtn,
    },
    data() {
        return {caseMap: {}, cpath: null};
    },
    watch: {
        casemodel: function (val) {
            if (val.split(".").length < 3) {
                Event.$emit('change-paper', this.getAllCases());
            }
            else {
                Event.$emit('change-paper-all', this.getAllCases());
            }
        }
    },
    mounted() {
        let _this = this;
        Event.$on('change-paper', (caseMap) => {
            _this.caseMap = caseMap;
            _this.casemodel.split(".").forEach((element, index) => {
                _this.caseMap = _this.caseMap[element];
            });
            _this.caseMap = topaperMap(_this.caseMap);
        });

        Event.$on('change-paper-all', (caseMap) => {
            _this.caseMap = caseMap;
            _this.casemodel.split(".").forEach((element, index) => {
                _this.caseMap = _this.caseMap[element];
            });
            _this.caseMap = toAllpaperMap(_this.caseMap);
        });

        if (!!_this.getAllCases()) {
            Event.$emit('change-paper', _this.getAllCases());
        }

    }
    ,
    methods: {

 ...Vuex.mapGetters(['getAllCases']),
        run(testcase) {
            Event.$emit('run-case', testcase);
        },
        showcode(key, value) {
            this.$router.push({name: 'casepathpy', params: {pyname: key}});
            let caseNamePath = null;
            for (let [k, v] of Object.entries(value)) {
                caseNamePath = k;
            }
            caseNamePath = caseNamePath.split(":")[0];
            this.cpath = caseNamePath.split(".").join("/") + ".py";

        },

    }
};