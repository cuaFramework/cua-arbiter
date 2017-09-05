function getusername() {
    let storage = window.localStorage;
    let username = storage['username'];
    return username ? username : "登录";

}

$(document).ready(function () {
    let username = getusername();
    user_app = new Vue({
        el: '#username',
        data: function () {
            if (username === '登录') {
                return {
                    message: {
                        username: username,
                        classes: 'btn waves-effect waves-teal',
                        href: 'login',
                        islogin: false


                    }
                }
            }
            else {
                return {
                    message: {
                        username: username,
                        classes: 'dropdown-button btn waves-effect waves-teal btn-flat',
                        href: '',
                        islogin: true


                    }
                }

            }
        }

    });
    user_list_app = new Vue({
        el: '#usr_dropdown',
        data: function () {
            if (username === '登录') {
                return {
                    data: {
                        itemList: {}
                    }
                }
            }
            else {
                return {
                    data: {
                        itemList: {}
                    }
                }
            }

        }
    });

    fetch("./getCaseList",
        {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
        if (response.status !== 200
        ) {
            console.log("存在一个问题，状态码为：" + response.status);
            return false;
        }
        else
            return response.json();
    }).then(
        function (json) {
            let model_list = json
            let slide_app = new Vue({
                props: ['todo'],
                el: '#nav-slide',
                data: {
                    modelList: model_list
                }
            });
            $('.collapsible').collapsible();
            $(".collapsible-body li").click(function () {
                //guide 显示到隐藏，root-case从隐藏到显示
                $("#root-guide"
                ).hide();
                $("#root-case").show();
                $(".collapsible-body .active").removeClass("active");
                $(event.currentTarget).addClass("active");
                // let casepath = $(event.currentTarget).children("a").attr("case-role").split("/");
                let casefullname = $(event.currentTarget).children("a").attr("case-role");
                $("#casepath").attr("casepath", casefullname);//给自定义casepath属性设置为路径全名
                //设置标题显示用例类名+方法名
                let caseclassname = casefullname.split(":")[1];
                $("#case_sumary_name").text(caseclassname);
                //读取用例文件,并设置codeContent
                let caseNamePathList = casefullname.split("/");//获取用例路径，解析内容
                let caseNamePath = caseNamePathList[caseNamePathList.length - 1].split(":")[0].split(".").join("/") + ".py";
                document.getElementById("code-content").style.fontSize = "14px";
                let codeContent = ace.edit("code-content");
                codeContent.setTheme("ace/theme/github");
                codeContent.setReadOnly(true);//设置只读
                codeContent.session.setMode("ace/mode/python");
                setBtn("edit");
                /*查询可编辑状态*/
                new ValidateEditWebSocket(caseNamePath);
                let xhr = new XMLHttpRequest();
                xhr.open('GET', '/static/' + caseNamePath, true);
                xhr.setRequestHeader("If-Modified-Since", "0");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        codeContent.setValue(xhr.responseText, -1);//设置显示内容，并将光标移动到start处
                        //文件加载成功后，监听按钮点击
                        $("#run").unbind('click').click(function () {
                            const storage = window.localStorage;
                            if (!storage['token']) {
                                window.location.href = "login";
                            }
                            RunWebSocketTest();
                            $('#modal-log').modal('open');
                        });
                        let edit_selector = $("#edit");
                        //编辑
                        edit_selector.unbind('click').click(function () {
                            const storage = window.localStorage;
                            if (!storage['token']) {
                                window.location.href = "login";
                            }
                            let codeContent = ace.edit("code-content");
                            if (edit_selector.find("span").text() === "编辑") {
                                new ValidateEditWebSocket();
                                /* 根据返回的结果处理*/
                                codeContent.setReadOnly(false);//设置为可编辑模式
                                codeContent.setTheme("ace/theme/chrome");//设置可编辑状态主题
                                return setBtn("save");
                            } else if ($("#edit").find("span").text() === "保存") {
                                //点击保存，不刷新按钮，调后端保存文件，成功后返回
                                $("#buffer-center").css('display', '');
                                $("#pro-center").css('display', 'none');
                                $("#modal-save").modal("open");
                                let newCodeContent = codeContent.getValue();
                                fetch("/arbiter/save/",
                                    {
                                        method: "POST",
                                        credentials: "same-origin",
                                        headers: {
                                            "X-CSRFToken": getCookie("csrftoken"),
                                            'Accept': 'application/json, text/plain, */*',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({casepath: casefullname, content: newCodeContent})
                                    }).then(function (response) {
                                    if (response.status !== 200) {
                                        console.log("存在一个问题，状态码为：" + response.status);
                                        return;
                                    }
                                    //检查响应文本
                                    response.json().then(function (data) {
                                        if (data['result'] === "ok") {
                                            $("#buffer-center").css('display', 'none');
                                            $("#pro-center").css('display', '');


                                        } else {
                                            alert("保存失败！");
                                        }
                                    });
                                }).catch(function (err) {
                                    console.log("Fetch错误:" + err);

                                })
                            }
                        });
                    }
                };
                xhr.send(null);
            });
            $("#logout").click(function (e) {

                e.preventDefault(e);
                deleteAllCookies();
                let storage = window.localStorage;
                storage.clear();
                window.location.href = ".";
            });

            $("#log-icon").click(function (e) {
                $('#modal-log').modal('open');
            });
            $("#import-caseobj").click(function (e) {
                $('#modal-import').modal('open');
            });
            $("#cloneCaseObj").click(function (e) {
                $('#modal-import').modal('close');
                $("#buffer-center").css('display', '');
                $("#pro-center").css('display', 'none');
                $("#modal-save").modal("open");
                fetch("./cloneCaseObj",
                    {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {


                    if (response.status !== 200
                    ) {
                        console.log("存在一个问题，状态码为：" + response.status);
                        return false;
                    }
                    else
                        return response.json();
                }).then(
                    function (json) {
                        $("#buffer-center").css('display', 'none');
                        $("#pro-center").css('display', '');
                        window.location.href = ".";

                    });

            });

            $("#clearLog").click(function (e) {
                $('#insert').text("")
            });

            //初始化下拉菜单
            $('.dropdown-button').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    constrain_width: false, // Does not change width of dropdown to that of the activator
                    hover: false, // Activate on hover
                    gutter: 0, // Spacing from edge
                    belowOrigin: false, // Displays dropdown below the button
                    alignment: 'left' // Displays dropdown with edge aligned to the left of button
                }
            );
            $('body').show();
        }
    )
    ;

});