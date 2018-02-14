//用例列表中的fab组件
const CaseFloatBtn = {
    template: '#caseFloatBtn',
    data: function () {
        return {
            modalShow: true,
            seen: false,
            testCase: "",
            testName: "",
            logDialog: false,
            logContent: [],
        }
    }, mounted() {
        let _this = this;
        Event.$on('run-case', function (value) {

            _this.testCase = value.testCase;
            _this.testName = value.testName;
            _this.run();
        });

    },
    methods: {
        ...Vuex.mapGetters(['username', 'jwtHeader']),
        openLogDialog() {
            this.logDialog = true;

        },
        closeLogDialog() {
            this.logDialog = false
        },
        onMouseEnterCodeFAB() {
            this.seen = true;
        },
        onMouseleaveCodeFAB() {
            this.seen = false;
        },
        log() {
            this.logDialog = true;
        },
        cleanLog() {
            this.logContent = [];
        },
        run() {

            run_socket.onmessage = (res) => {
                this.logContent.push(res.data);
                //   document.getElementById("insert").innerHTML += "<div><p>" + e.data + "</p></div>";

            };
            run_socket.onopen = () => {
                run_socket.send("runCase " + this.testCase + " " + this.username()+ " " + this.testName);
            };
            // Call onopen directly if socket is already open
            if (run_socket.readyState === WebSocket.OPEN)
                run_socket.onopen();

            this.logDialog = true;
        }
        ,
        add() {

        },
    }
};