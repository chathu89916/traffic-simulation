class newCarDown {
    constructor(beginX, beginY, endX, endY, steps){
      this.beginX = beginX;
      this.beginY = beginY;
      this.endX = endX;
      this.endY = endY;
      this.steps = steps;
    }
    display(){
      this.distanceX = this.endX - this.beginX;
      this.distanceY = this.endY - this.beginY;
      this.rotate = abs(atan2(this.distanceX,this.distanceY));
      console.log(this.rotate);
      this.pctY = this.pctY + this.distanceY/this.steps;
      this.pctX = this.pctX + this.distanceX/this.steps;
      this.y = this.beginY + this.pctY;
      this.x = this.beginX + this.pctX;
      console.log(this.x,this.y);
      if(this.y <= height && this.y >=0 && this.x <= height && this.x >=0){
        fill('red');
        push();
        translate(this.x, this.y,)
        angleMode(RADIANS);
        rotate(this.rotate);
        rect(0, 0, 10.0, 20.0);
        pop();
      }else{
        this.pctX=this.pctY = 0.0;
      }
    }
  }
  