let app = new Vue({
    router,
    el: '#app', store,
    data() {
        return {modelList: {}}
    },
    mounted() {
        this.flushAllCases().then(
            (json) => {
                Event.$emit('change-paper', json);
                document.getElementsByTagName("body")[0].style.display = "";
                this.modelList = json;
            }).catch((err) => {
            console.log("请求错误:" + err);
        });
    },
    methods: {
        ...Vuex.mapActions(['flushAllCases']),

    },
    components: {        //要把组件写入到components里面，如果没有放的话在切换的时候就会找不到 组件
        'ArbiterNavbar': ArbiterNavbar,
        'ArbiterSlide': ArbiterSlide,
        'CaseFloatBtn': CaseFloatBtn,
        'CasePaper': CasePaper,
    }
});

