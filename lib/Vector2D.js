class Vector2D{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    differencevector(a,b){
        this.x = a.x - b.x;
        this.y = a.y - b.y;
      }

    get magnitude(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}