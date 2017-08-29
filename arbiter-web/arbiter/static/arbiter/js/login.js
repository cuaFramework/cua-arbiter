/**
 * Created by Administrator on 2017/8/6.
 */
function login() {

    $.ajax({
        type: "POST",
        url: "api-token-auth/",
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

$(function () {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = .3;
    ctx.strokeStyle = (new Color()).style;

    let dots = {
        nb: 40,
        distance: 50,
        d_radius: 100,
        array: []
    };

    function createColorStyle() {
        return 'rgba(0,0,0,0.1)';
    }

    function Color() {

        this.style = createColorStyle();
    }

    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random() * 4;

        this.color = new Color();
    }

    Dot.prototype = {
        draw: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color.style;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }
    };

    function createDots() {
        for (let i = 0; i < dots.nb; i++) {
            dots.array.push(new Dot());
        }
    }

    function moveDots() {
        for (let i = 0; i < dots.nb; i++) {

            let dot = dots.array[i];

            if (dot.y < 0 || dot.y > canvas.height) {

                dot.vy = -dot.vy;
            }
            else if (dot.x < 0 || dot.x > canvas.width) {
                dot.vx = -dot.vx;
            }
            dot.x += dot.vx;
            dot.y += dot.vy;
        }
    }

    function drawDots() {
        for (let i = 0; i < dots.nb; i++) {
            let dot = dots.array[i];
            dot.draw();
        }
    }

    function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveDots();
        // connectDots();
        drawDots();

        requestAnimationFrame(animateDots);
    }


    createDots();
    requestAnimationFrame(animateDots);
});
