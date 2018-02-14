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
            this.value = val;
        },

        toggle() {
            this.open = !this.open;
        },

    }
};