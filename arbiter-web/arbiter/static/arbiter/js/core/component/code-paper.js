//py文件的paper组件
const CodePaper = {
    props: {pypathx: null,},
    data: function () {
        return {path: null}
    },
    template: '#codePaper',
    mounted() {

        this.path = this.pypathx;
        if (!!this.path) {
            for (let [k, v] of Object.entries(this.path)) {
                if (k) {
                    caseNamePath = k;
                    break;
                }
            }
            caseNamePath = caseNamePath.split(":")[0];
            this.path = caseNamePath.split(".").join("/") + ".py";

            this.loadCaseFile(this.path)
        }

    },
    methods: {
        showcode(key, value) {
            this.$router.push({name: 'casepathpy', params: {pyname: key}});
            let caseNamePath = null;

            for (let [k, v] of Object.entries(value)) {
                caseNamePath = k;
            }
            caseNamePath = caseNamePath.split(":")[0];
            this.path = caseNamePath.split(".").join("/") + ".py";

        },
        loadCaseFile(caseNamePath) {

            //  document.getElementById("codecontent").style.fontSize = "14px";
            // document.getElementById("codecontent").style.height = "600px";
            let codeContent = ace.edit(this.$el);
            codeContent.setTheme("ace/theme/github");
            codeContent.setReadOnly(true);//设置只读
            codeContent.$blockScrolling = Infinity;
            codeContent.session.setMode("ace/mode/python");
            // setBtn("edit");
            /*查询可编辑状态*/
            new ValidateEditWebSocket(caseNamePath);
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/static/' + caseNamePath, true);
            xhr.setRequestHeader("If-Modified-Since", "0");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    codeContent.setValue(xhr.responseText, -1);//设置显示内容，并将光标移动到start处
                }
            };
            xhr.send(null);
        }

    }
};