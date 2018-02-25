//侧边菜单组件
const ArbiterSlide = {
    props: {modelList: {}},
    template: '#arbiterNavSlide',
    store,
    data() {
        return {
            open: true,
            docked: true,
            value: "",
            dialog: false,
            gitInfo: {},
            gitCloneStatus: 'finish',
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
        ...Vuex.mapGetters(['getSlideOpen', 'jwtHeader']),
        handleChange(val) {
            this.value = val;
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
                    window.location.href = window.location.href;
                }).catch((err) => {
                this.gitCloneStatus = 'finish';
                console.log("请求错误:" + err);
            });
        },

        toggle() {
            this.open = !this.open;
        },
        loadCasePaper(casemodel) {
            this.$router.push({name: 'casepath', params: {casemodel: casemodel}});
        },

    }
};