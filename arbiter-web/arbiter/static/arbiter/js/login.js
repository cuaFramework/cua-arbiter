/**
 * Created by Administrator on 2017/8/6.
 */

var app = new Vue({
    el: '#login-form',
    data: {
        inputtext: {},
        prompt:""
    },
    methods: {
        submit: function () {
            fetch("api-token-auth",
                {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.inputtext)
                }).then(function (response) {
                if (response.status !== 200
                ) {
                   this.prompt="账号或密码错误";
                    return false;
                }
                else
                    return response.json();
            }).then(
                function (msg) {
                    if (msg.token) {
                        let storage = window.localStorage;
                        storage["token"] = msg.token;
                        fetch("./getUserDetail",
                            {
                                method: "POST",
                                credentials: "same-origin",
                                headers: {
                                    'Accept': 'application/json, text/plain, */*',
                                    'Content-Type': 'application/json'
                                }
                            }).then(response => {
                            if (response.status !== 200
                            ) {
                                console.log("存在一个问题，状态码为：" + response.status);
                                return false;
                            }
                            else
                                return response.json();

                        }).then(
                            json => {
                                storage["username"] = json["username"];
                                storage["role"] = json["role"];
                                window.location.href = ".";
                            }
                        );

                    }
                    else {
                       this.prompt="认证失败";

                    }
                }
            );
        }
    }

});






