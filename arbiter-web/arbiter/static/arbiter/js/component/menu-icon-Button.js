//菜单图标和其下拉菜单组件
const menuIconButton = {
    template: '#menuIconButton', store,
    props: {usernameAbbreviation: null},
    data: function () {
        return {
            appMenuTrigger: null,
            appMenuOpen: false,
            dialog: false,
            gitInfo:{},
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

            getRes("./cloneCaseObj", this.gitInfo, this.jwtHeader()).then(
                json => {
                    this.gitCloneStatus = 'finish';
                    window.location.href = ".";
                }).catch((err) => {
                this.gitCloneStatus = 'fail';
                console.log("请求错误:" + err);
            });
        },
    }
};