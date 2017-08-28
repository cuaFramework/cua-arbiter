/**
 * Created by Administrator on 2017/8/6.
 */
 function login() {

    $.ajax({
        type: "POST",
        url: "api-token-auth/",
        data : $("#login-form").serialize(),
        success: function(msg) {
            var res = eval("("+msg+")");
            if(res.responseCode=="Failure")
            {
                $("#LoginInfo").text("认证失败:"+res.responseData);
            }
            else if(res.responseCode=="Success")
            {
                $(".modal.fade.in").modal('hide');
                window.location.href=RootPath;
            }
            else
            {
                $("#LoginInfo").text("认证失败:未知错误-请联系管理员");

            }
        }
    });
    return false;
}

$(function(){
  var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.lineWidth = .3;
  ctx.strokeStyle = (new Color(150)).style;

  var dots = {
    nb: 40,
    distance: 50,
    d_radius: 100,
    array: []
  };

  function colorValue(min) {
    return Math.floor(Math.random() * 255 + min);
  }

  function createColorStyle(r,g,b) {
    return 'rgba(0,0,0,0.1)';
  }

  function mixComponents(comp1, weight1, comp2, weight2) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
  }

  function averageColorStyles(dot1, dot2) {
    var color1 = dot1.color,
        color2 = dot2.color;

    var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
        g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
        b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
  }

  function Color(min) {
    min = min || 0;
    this.r = colorValue(min);
    this.g = colorValue(min);
    this.b = colorValue(min);
    this.style = createColorStyle(this.r, this.g, this.b);
  }

  function Dot(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    this.radius = Math.random() * 4;

    this.color = new Color();
  }

  Dot.prototype = {
    draw: function(){
      ctx.beginPath();
      ctx.fillStyle = this.color.style;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    }
  };

  function createDots(){
    for(i = 0; i < dots.nb; i++){
      dots.array.push(new Dot());
    }
  }

  function moveDots() {
    for(i = 0; i < dots.nb; i++){

      var dot = dots.array[i];

      if(dot.y < 0 || dot.y > canvas.height){
        dot.vx = dot.vx;
        dot.vy = - dot.vy;
      }
      else if(dot.x < 0 || dot.x > canvas.width){
        dot.vx = - dot.vx;
        dot.vy = dot.vy;
      }
      dot.x += dot.vx;
      dot.y += dot.vy;
    }
  }

  function drawDots() {
    for(i = 0; i < dots.nb; i++){
      var dot = dots.array[i];
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
