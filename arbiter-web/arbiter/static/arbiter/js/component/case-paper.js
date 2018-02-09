//每个case的paper组件
const CasePaper = {
    props: {casemodel: "", pyname: ""}, store,
    template: '#casePaper',
    components: {
        'CodePaper': CodePaper,
        'CodeFloatBtn': CodeFloatBtn,
    },
    data() {
        return {caseMap: {}, cpath: null};
    },
    watch: {
        casemodel: function (val) {
            if (val.split(".").length < 3) {
                Event.$emit('change-paper', this.getAllCases());
            }
            else {
                Event.$emit('change-paper-all', this.getAllCases());
            }
        }
    },
    mounted() {
        let _this = this;
        Event.$on('change-paper', (caseMap) => {
            _this.caseMap = caseMap;
            _this.casemodel.split(".").forEach((element, index) => {
                _this.caseMap = _this.caseMap[element];
            });
            _this.caseMap = topaperMap(_this.caseMap);
        });

        Event.$on('change-paper-all', (caseMap) => {
            _this.caseMap = caseMap;
            _this.casemodel.split(".").forEach((element, index) => {
                _this.caseMap = _this.caseMap[element];
            });
            _this.caseMap = toAllpaperMap(_this.caseMap);
        });

        if (!!_this.getAllCases()) {
            Event.$emit('change-paper', _this.getAllCases());
        }

    }
    ,
    methods: {
        ...Vuex.mapGetters(['getAllCases']),
        run(testcase) {
            Event.$emit('run-case', testcase);
        },
        showcode(key, value) {
            this.$router.push({name: 'casepathpy', params: {pyname: key}});
            let caseNamePath = null;
            for (let [k, v] of Object.entries(value)) {
                caseNamePath = k;
            }
            caseNamePath = caseNamePath.split(":")[0];
            this.cpath = caseNamePath.split(".").join("/") + ".py";

        },

    }
};