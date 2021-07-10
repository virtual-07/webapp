function Player(x, y){
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 50;

    this.x_speed = 0;
    this.y_speed = 0;
    this.friction = 0.4;
    this.maxSpeed = 10;


    this.step = function(){
        if(true){
            //horizontal
            if(!leftKey && !rightKey || leftKey && rightKey){
                //slow down
                this.x_speed *= (1 - this.friction);
            } else if(rightKey){
                this.x_speed ++;
            } else if(leftKey){
                this.x_speed --;
            }
            
            
            //vertical
            if(upKey){
                this.y_speed -= 10;
            }
            
            this.y_speed += 5;
            
            //speed correction
            if(this.x_speed > this.maxSpeed){
                this.x_speed = this.maxSpeed;
            }else if(this.x_speed < -this.maxSpeed){
                this.x_speed = -this.maxSpeed;
            }
            
            if(this.y_speed > this.maxSpeed){
                this.y_speed = this.maxSpeed;
            }else if(this.y_speed < -this.maxSpeed){
                this.y_speed = -this.maxSpeed;
            }


            //round (no decimal numbers)
            // (x)
            if(this.x_speed > 0){
                this.x_speed = Math.floor(this.x_speed);
                
            } else{
                this.x_speed = Math.ceil(this.x_speed);
                
            }
            // (y)
            if(this.y_speed > 0){
                this.y_speed = Math.floor(this.y_speed);
                
            } else{
                this.y_speed = Math.ceil(this.y_speed);

            }


            //Collision
            // (x)
            let horizontalRect = {
                x: this.x + this.x_speed,
                y: this.y,
                width: this.width,
                height: this.height
            }
            // (y)
            let verticalRect = {
                x: this.x,
                y: this.y + this.y_speed,
                width: this.width,
                height: this.height
            }

            //check for intersections
            for(let i = 0; i < borders.length; i++){
                let borderRect = {
                    x: borders[i].x,
                    y: borders[i].y,
                    width: borders[i].width,
                    height: borders[i].height
                }
                if(checkIntersection(horizontalRect, borderRect)){
                    // while(checkIntersection(horizontalRect, borderRect)){
                    //     horizontalRect.x -= Math.sign(this.x_speed);
                    // }
                    this.x_speed = 0;
                }
                if(checkIntersection(verticalRect, borderRect)){
                    // while(checkIntersection(verticalRect, borderRect)){
                    //     verticalRect.x -= Math.sign(this.x_speed);
                    // }
                    this.y_speed = 0;
                }
            }

            
            this.x += this.x_speed;
            this.y += this.y_speed;
        }
    }

    this.draw = function(){
        brush.fillStyle = "#fc8b40";
        brush.fillRect(this.x, this.y, this.width, this.height)
    }
}