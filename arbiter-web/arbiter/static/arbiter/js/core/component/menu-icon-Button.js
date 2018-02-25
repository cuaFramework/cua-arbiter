//菜单图标和其下拉菜单组件
const menuIconButton = {
    template: '#menuIconButton', store,
    props: {usernameAbbreviation: null},
    data: function () {
        return {
            appMenuTrigger: null,
            appMenuOpen: false,
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
    }
};