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