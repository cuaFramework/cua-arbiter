let app = new Vue({
    router,
    el: '#app',store,
    data() {
        this.$http.post("/arbiter/getCaseList").then(function (response) {
            if (response.status !== 200
            ) {
                console.log("存在一个问题，状态码为：" + response.status);
                return false;
            }
            else
                return response.json();
        }).then(
            (json) => {
                this.modelList = json;
                this.setAllCases(json);
                Event.$emit('change-paper', json);
                document.getElementsByTagName("body")[0].style.display = "";
            });
        return {modelList: {}}
    },
    methods:{
         ...Vuex.mapMutations(['setAllCases']),
    },
    components: {        //要把组件写入到components里面，如果没有放的话在切换的时候就会找不到 组件
        'ArbiterNavbar': ArbiterNavbar,
        'ArbiterSlide': ArbiterSlide,
        'CaseFloatBtn':CaseFloatBtn,
        'CasePaper': CasePaper,
    }
});

