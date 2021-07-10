var canves;
var brush;

var gameLoop;
var player;

var upKey;
var downKey;
var rightKey;
var leftKey;

var borders = [];


window.onload = function(){
    canves = document.getElementById("game-canves");
    brush = canves.getContext("2d");


    player = new Player(50, 500);

    //create border
    for(let i = 0; i < 6; i++){
        borders.push(new Border(0 + 50 * i, 750, 50, 50, 1));
    }
    borders.push(new Border(0, 700, 50, 50, 2));

    for(let i = 0; i < 3; i++){
        borders.push(new Border(300, 750 - 50 * i, 50, 50, 2))
    }

    gameLoop = setInterval(update, 1000/30)


    brush.fillStyle = "#333333";
    brush.fillRect(0, 0, 1400, 800);


    setUpInputs();
}

function update(){
    player.step();
    draw();

}

function draw(){
    brush.fillStyle = "#333333";
    brush.fillRect(0, 0, 1400, 800);

    player.draw();
    for(let i = 0; i < borders.length; i++){
        borders[i].draw();
    }
}

function setUpInputs(){
    document.addEventListener("keydown", function(event){
        if(event.key === "w" || event.key === "Spacebar" || event.key === " "){
            upKey = true;
            
        }
        else if(event.key === "a" || event.key === "ArrowLeft"){
            leftKey = true;

        }
        else if(event.key === "d" || event.key === "ArrowRight"){
            rightKey = true;

        }
    });

    document.addEventListener("keyup", function(event){
        if(event.key === "w" || event.key === "Spacebar" || event.key === " "){
            upKey = false;

        }
        else if(event.key === "a" || event.key === "ArrowLeft"){
            leftKey = false;

        }
        else if(event.key === "d" || event.key === "ArrowRight"){
            rightKey = false;

        }
    });

}

function checkIntersection(r1, r2){
    if(r1.x >= r2.x + r2.width){
        return false;

    } else if(r1.x + r1.width <= r2.x) {
        return false;

    } else if(r1.y + r1.height <= r2.y) {
        return false;

    } else if(r1.y + r1.height <= r2.y) {
        return false;
    
    }else{
        return true;
    }
}