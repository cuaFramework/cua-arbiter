//侧边菜单组件
const ArbiterSlide = {
    props: {modelList: {}},
    template: '#arbiterNavSlide',
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