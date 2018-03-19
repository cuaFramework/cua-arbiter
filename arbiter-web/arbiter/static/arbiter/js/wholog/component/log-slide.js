//侧边菜单组件
const logSlide = {
    template: '#logSlide',
    store,
    data() {
        return {
            open: true,
            docked: true,
            value: ""
        }
    },
    computed: {
        slideOpen() {
            return this.getSlideOpen();
        },
    },
    watch: {
        slideOpen(val) {
            this.open = val;
        },

    },

    methods: {
        ...Vuex.mapGetters(['getSlideOpen']),
        handleChange(val) {
            this.typeList = val;
        },

        toggle() {
            this.open = !this.open;
        },
        //路由跳转
        routerToHistoryLog() {
            //this.$router.push({name: 'casepath', params: {casemodel: casemodel}});
            this.$router.push({name: 'historyLog'});
        },
        routerToLogCount() {
            //this.$router.push({name: 'casepath', params: {casemodel: casemodel}});
            this.$router.push({name: 'logCount'});
        }


    }
};