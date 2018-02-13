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