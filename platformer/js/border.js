function Border(x, y, width, height, type){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;

    this.draw = function(){
        brush.fillStyle = "#fa9600";
        brush.fillRect(this.x, this.y, this.width, this.height)
    }

}