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
        ...Vuex.mapMutations(['setUserName', 'refreshJwtToken',]),
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
                //检查响应文本
                getRes("/arbiter/save/", {
                    casepath: caseNamePath,
                    content: newCodeContent
                }, this.jwtHeader()).then((data) => {
                    if (data['result'] === "ok") {
                        this.editIcon = "mode_edit";
                        let codeContent = ace.edit("code-paper");
                        codeContent.setReadOnly(true);//设置为不可编辑模式
                        this.saveDialog = false;
                        this.$router.push({name: 'casepath', params: {casemodel: this.casemodel}});
                    } else {
                        alert("文件保存失败！");
                    }
                }).catch((err) => {
                    console.log("请求错误:" + err);
                })
            }
        }
    }
};