//每个case的paper组件
const CasePaper = {
    props: {casemodel: "", pyname: ""}, store,
    template: '#casePaper',
    components: {
        'CodePaper': CodePaper,
        'CodeFloatBtn': CodeFloatBtn,
    },
    data() {
        return {
            caseMap: {},
            cpath: null,
            copyDialog: false,
            deleteDialog: false,
            copyStatus: "finish",
            deleteStatus: "finish",
            fileInfo: {
                oldName: "",
                newName: "",
            },
            deleteFilePath: "",
        };
    },
    computed: {
        slideOpen() {
            return this.getSlideOpen();
        },
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
        ...Vuex.mapGetters(['getAllCases', 'jwtHeader','getSlideOpen']),
        run(testCase,testName) {
            Event.$emit('run-case', {testCase:testCase,testName:testName,});
        },
        openDeleteDialog(value) {
            this.deleteDialog = true;
            this.deleteStatus = 'finish';
            let caseNamePath = null;
            for (let [k, v] of Object.entries(value)) {
                caseNamePath = k;
            }
            caseNamePath = caseNamePath.split(":")[0];
            let deletePath = caseNamePath.split(".").join("/") + ".py";
            this.deleteFilePath = deletePath.substring(deletePath.indexOf('/') + 1);

        },
        closeDeleteDialog() {
            this.deleteDialog = false
        },
        openCopyDialog(value) {
            this.copyDialog = true;
            this.copyStatus = 'finish';
            let caseNamePath = null;
            for (let [k, v] of Object.entries(value)) {
                caseNamePath = k;
            }
            caseNamePath = caseNamePath.split(":")[0];
            let oldpath = caseNamePath.split(".").join("/") + ".py";
            let newpath = caseNamePath.split(".").join("/") + "_copy.py";
            this.fileInfo.oldName = oldpath.substring(oldpath.indexOf('/') + 1);
            this.fileInfo.newName = newpath.substring(newpath.indexOf('/') + 1);
        },
        closeCopyDialog() {
            this.copyDialog = false
        },
        showcode(key, value) {
            if (this.$router.currentRoute.name !== 'casepathpy') {
                this.$router.push({name: 'casepathpy', params: {pyname: key}});
            }
            else {
                this.$router.push({name: 'casepath', params: {casemodel: this.casemodel}});
            }

            let caseNamePath = null;
            for (let [k, v] of Object.entries(value)) {
                caseNamePath = k;
            }
            caseNamePath = caseNamePath.split(":")[0];
            this.cpath = caseNamePath.split(".").join("/") + ".py";
        },
        copyFile() {
            this.copyStatus = 'running';
            getRes("/arbiter/copy", {
                oldPath: this.fileInfo.oldName,
                newPath: this.fileInfo.newName
            }, this.jwtHeader()).then(
                json => {
                    window.location.href = window.location.href;
                }).catch((err) => {
                this.copyStatus = 'fail';
                console.log("请求错误:" + err);
            });
        },
        deleteFile() {
            this.deleteStatus = 'running';
            getRes("/arbiter/delete", {deleteFilePath: this.deleteFilePath}, this.jwtHeader()).then(
                json => {
                    window.location.href = window.location.href;
                }).catch((err) => {
                this.deleteStatus = 'fail';
                console.log("请求错误:" + err);
            });
        },

    }
};