/**
 * Created by Administrator on 2017/8/6.
 */

const login_app = new Vue({
    el: '#login-form',
    data: {
        inputtext: {},
        prompt: "",
    },
    methods: {
        submit(e) {
            fetch("api-token-auth",
                {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.inputtext)
                }).then((response) => {
                if (response.status !== 200
                ) {
                    this.prompt = "账号或密码错误";
                    const error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
                else
                    return response.json();
            }).then(
                (msg) => {
                    if (msg.token) {
                        let storage = window.localStorage;
                        storage["token"] = msg.token;
                     window.location.href ="."
                    }
                    else {
                        this.prompt = "获取登陆密钥失败";
                    }
                }
            ).catch((err) => {
                    console.log("登陆失败，服务端返回状态为：" + err);
                }
            );
        }
    }
});






