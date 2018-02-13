//侧边菜单组件
const logSlide = {
    template: '#logSlide',
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

    }
};