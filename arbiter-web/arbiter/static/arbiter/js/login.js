/**
 * Created by Administrator on 2017/8/6.
 */

function login() {

    $.ajax({
        type: "POST",
        url: "api-token-auth",
        data: $("#login-form").serialize(),
        success: function (msg) {

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
                    if (response.status !== 200) {
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
                $("#LoginInfo").text("认证失败");

            }
        },
        error: function () {
            $("#LoginInfo").text("账号或密码错误");
        }
    });
    return false;
}


