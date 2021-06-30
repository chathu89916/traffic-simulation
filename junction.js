function junction(){
  downLight = true;
  upLight = true;
  leftLight = true;
  rightLight = true;

    this.counter1 = function(){
      downLight = false;
  upLight = true;
  leftLight = true;
  rightLight = true;

    }

    this.counter2 = function(){
      downLight = true;
  upLight = false;
  leftLight = true;
  rightLight = true;

    }
    this.counter3 = function(){
      downLight = true;
  upLight = true;
  leftLight = false;
  rightLight = true;

    }
    this.counter4 = function(){
      downLight = true;
  upLight = true;
  leftLight = true;
  rightLight = false;

    }
    this.lightDown = function(){
        push();
        var red = downLight;
        strokeWeight(5.0);
        if(red == true){
          stroke('red');  
        }if(red == false){
          stroke('green');
        }
        line(250,250,350,250);
        pop();
    } 
    this.lightUp = function(){
        push();
        strokeWeight(5.0);
        var red = upLight;
        strokeWeight(5.0);
        if(red == true){
          stroke('red');  
        }if(red == false){
          stroke('green');
        }
        line(250,350,350,350);
        pop();
    }  
    this.lightLeft = function(){
        push();
        strokeWeight(5.0);
        var red = leftLight;
        strokeWeight(5.0);
        if(red == true){
          stroke('red');  
        }if(red == false){
          stroke('green');
        }
        line(250,250,250,350);
        pop();
    }    
    this.lightRight = function(){
        push();
        strokeWeight(5.0);
        var red = rightLight;
        strokeWeight(5.0);
        if(red == true){
          stroke('red');  
        }if(red == false){
          stroke('green');
        }
        line(350,250,350,350);
        pop();
    }
    this.roadOverlay = function(){
        push();
        strokeWeight(5.0);
        stroke(150);
        line(0,250,250,250);
        line(0,350,250,350);
        line(350,250,width,250);
        line(350,350,width,350);
        line(250,0,250,250);
        line(350,0,350,250);
        line(250,350,250,height);
        line(350,350,350,height);
        linedash(350,300,width,300,15);
        linedash(250,300,0,300,15);
        linedash(300,250,300,0,15);
        linedash(300,350,300,height,15);
        pop();

    }  




    // this.redLightDown= function(){
        
    //     if(timeController()>0 && timeController() < 300){
    //         return false;
    //     }
    //     else{
    //         return true;
    //     }
    // }
    // this.redLightUp= function(){
        
    //     if(timeController()>310 && timeController() < 610){
    //         return false;
    //     }
    //     else{
    //         return true;
    //     }
    // }
    // this.redLightLeft= function(){
        
    //     if(timeController()>620 && timeController() < 920){
    //         return false;
    //     }
    //     else{
    //         return true;
    //     }
    // }
    // this.redLightRight= function(){
        
    //     if(timeController()>930 && timeController() < 1130){
    //         return false;
    //     }
    //     else{
    //         return true;
    //     }
    // }
}

function linedash(x1, y1, x2, y2, delta, style = '-') {
    // delta is both the length of a dash, the distance between 2 dots/dashes, and the diameter of a round
    let distance = dist(x1,y1,x2,y2);
    let dashNumber = distance/delta;
    let xDelta = (x2-x1)/dashNumber;
    let yDelta = (y2-y1)/dashNumber;
  
    for (let i = 0; i < dashNumber; i+= 2) {
      let xi1 = i*xDelta + x1;
      let yi1 = i*yDelta + y1;
      let xi2 = (i+1)*xDelta + x1;
      let yi2 = (i+1)*yDelta + y1;
  
      if (style == '-') { line(xi1, yi1, xi2, yi2); }
      else if (style == '.') { point(xi1, yi1); }
      else if (style == 'o') { ellipse(xi1, yi1, delta/2); }
    }
  }

  