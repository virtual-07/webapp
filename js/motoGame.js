var c = document.createElement("canvas");
var ctx = c.getContext("2d");
c.width = window.innerWidth; c.height = window.innerHeight * 0.6;
document.body.appendChild(c);
var afk = false;
var imgPath = "../images/motogame/moto.png"

var perm = [];
while (perm.length < 255) {
    while (perm.includes(val = Math.floor(Math.random()*255)));
    perm.push(val);
}

var lerp = (a, b, t) => a + (b-a) * (1 - Math.cos(t*Math.PI))/2;
var noise = x => {
    x = x * 0.01 % 255;
    return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
}

var player = new function() {

    this.create = function()
    {
        this.img.src = imgPath;
        
    }
    this.x = c.width/2;
    this.y = 0;
    this.ySpeed = 0;
    this.rot = 0;
    this.rSpeed = 0;

    this.img = new Image();



    this.draw = function() {
        var p1 =  c.height - noise(t + this.x) * 0.45;
        var p2 =  c.height - noise(t + this.x) * 0.45;

        var grounded = 0;
        if(p1-15 > this.y) {
            this.ySpeed += 0.3;
        } else {
            this.ySpeed -= this.y - (p1 - 15);
            this.y = p1 - 15;
            grounded = 1;
        }

        if(!playing || grounded && Math.abs(this.rot) > Math.PI * 0.5) {
            playing = false;
            this.rSpeed = 5;
            k.ArrowUp = 1;
            this.x -= speed * 5;
        }

        var angle = Math.atan2((p2-15) - this.y, (this.x + 5) - this.x);
        this.y += this.ySpeed;

        if(grounded && playing) {
            this.rot -= (this.rot - angle) * 0.5;
            this.rSpeed = this.rSpeed - (angle - this.rot);
        }
        this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
        this.rot -= this.rSpeed * 0.1;
        if(this.rot > Math.PI) this.rot = -Math.PI;
        if(this.rot < -Math.PI) this.rot = Math.PI;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.drawImage(this.img, -15, -15, 80, 80);
        ctx.restore();
    }
}

var t = 0;
var speed = 0;
var playing = true;
var k = {ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0};

var loop = () => {
    speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.01;
    speed = 0.4;
    t += 10 * speed;
    var my_gradient = ctx.createLinearGradient(0, 0, 100, 800);
    my_gradient.addColorStop(0, "orange");
    my_gradient.addColorStop(1, "red");
    ctx.fillStyle = my_gradient;
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, c.height);
    for (var i = 0; i < c.width; i++) {
        ctx.lineTo(i, c.height - noise(t + i) * 0.25);
    }
    ctx.lineTo(c.width, c.height);
    ctx.fill();
    player.create();
    player.draw();
    requestAnimationFrame(loop);
}

onkeydown = d => k[d.key] = 1;
onkeyup = d => k[d.key] = 0;


window.addEventListener("keydown", (e) => {
    if(e.keyCode === 13) 
    {
        imgPath = "../images/motogame/afkMode.png"
        console.log("Enter Detected!");
        player.draw();
        console.log(imgPath)
    }
})

loop();