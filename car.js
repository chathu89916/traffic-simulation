class addCar {

    constructor( direction, turn){
        this.direction = direction;
        this.arrival = false;

        this.turn = turn;
        this.pos = createVector(0, 0);
        this.heading = 0;
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maxforce = 0.02;
        this.maxspeed = 1.0;
        this.path = [];
        this.downLeft = [createVector(325,0), createVector(325,250), createVector(350,275), createVector(600,275)];
        this.downRight = [createVector(325,0), createVector(325,250),createVector(250,325),createVector(0,325)];
        this.upLeft = [createVector(275,600),createVector(275,350),createVector(250,325),createVector(0,325)];
        this.upRight = [createVector(275,600),createVector(275,350),createVector(350,275),createVector(600,275)];
        this.leftUp = [createVector(600,325),createVector(350,325),createVector(275,250),createVector(275,0)];
        this.leftDown = [createVector(600,325),createVector(350,325),createVector(325,350),createVector(325,600)];
        this.rightUp = [createVector(0,275),createVector(250,275),createVector(275,250),createVector(275,0)];
        this.rightDown = [createVector(0,275),createVector(250,275),createVector(325,350),createVector(325,600)];
        this.currentNode = 1;

        switch (this.direction) {
        case "down":
            this.velocity.x = 0.0;
            this.velocity.y = 1.0;
            this.pos.x = 325;
            this.pos.y = 0;
            switch (this.turn){
                case "left":
                    this.path = this.downLeft;
                    break;
                case "right":
                    this.path = this.downRight;
                break;
            }
            break;
        case "up":
            this.velocity.x = 0.0;
            this.velocity.y = -1.0;
            this.pos.x = 275;
            this.pos.y = 600;
            switch (this.turn){
                case "left":
                    this.path = this.upLeft;
                    break;
                case "right":
                    this.path = this.upRight;
                break;
            }
            break;
        case "left":
            this.velocity.x = -1.0;
            this.velocity.y = 0.0;
            this.pos.x = 600;
            this.pos.y = 325;
           
            switch (this.turn){
                case "left":
                    this.path = this.leftDown;
                    break;
                case "right":
                    this.path = this.leftUp;
                break;
            }

            break;
        case "right":
            this.velocity.x = 1.0;
            this.velocity.y = 0.0;
            this.pos.x = 0;
            this.pos.y = 275;
            switch (this.turn){
                case "left":
                    this.path = this.rightDown;
                    break;
                case "right":
                    this.path = this.rightUp;
                break;
            }

            break;
    }}

    follow(){
        
        this.target  = this.path[this.currentNode].copy();
        //console.log(this.distance(this.pos, this.target));
        if(this.pos.dist(this.target) <= 15){
           // if(this.distance(this.pos, this.target) <= 10){
            this.currentNode +=1;
            if(this.currentNode >= this.path.length){
                this.currentNode = this.path.length-1;
            }
        }
        if(this.target != null){
            this.seek(this.target, this.arrival);
        }
    }


    seek(target, arrival = false) {
        let force = p5.Vector.sub(target, this.pos);
        let desiredSpeed = this.maxspeed;
        if (arrival) {
          let slowRadius = 100;
          let distance = force.mag();
          if (distance < slowRadius) {
            desiredSpeed = map(distance, 0, slowRadius, 0, this.maxspeed);
          }
        }
        force.setMag(desiredSpeed);
        force.sub(this.velocity);
        force.limit(this.maxforce);
        this.applyForce(force);
      }




    applyForce(force){
        this.acceleration.add(force);
    }

    queueing (cars){

        this.cars =cars;
        this.desiredseperation = 30;
        this.sum = createVector(0,0);
        this.count = 0;
        for(var i = this.cars.length - 1; i >= 0; i--){
            this.d = this.pos.copy();
            this.d = this.d.dist(this.cars[i].pos);
            if((this.d>0) && (this.d < this.desiredseperation)){
                this.diff = this.pos.copy();
                this.diff = this.diff.sub(this.cars[i].pos);
                this.diff.normalize();
                this.diff.div(this.d);
                this.sum.add(this.diff);
                this.count++;
            }
        }
        if(this.count > 0){

            this.sum.div(this.count);
            this.sum.normalize();
            this.sum.mult(this.maxspeed);

            this.sum.sub(this.velocity);
            this.sum.limit(this.maxforce)  

            this.applyForce(this.sum);
        }


    }

    lightCheck(green,Cars){
        this.green = green;


        if(this.green !== 'right' && this.direction == 'right' && this.currentNode == 1){
            this.path = [createVector(0,275),createVector(225,275)];
            let dx = 500;
            let dy = 500;
            let carNumber = 0;
            for(var i = Cars.length-1; i >= 0 ; i--){
                if(Cars[i].pos.x-this.pos.x > 6 && Cars[i].pos.x-this.pos.x < dx && Math.abs(this.pos.y-Cars[i].pos.y) < 20){
                    dx = Cars[i].pos.x-this.pos.x;
                    dy = Math.abs(this.pos.y-Cars[i].pos.y);
                    carNumber = i;
                }
            }
            if((this.path[1].x - this.pos.x) > dx){
                this.path = [createVector(0,275),createVector(Cars[carNumber].pos.x-25,Cars[carNumber].pos.y)];
            }

            this.arrival = true;
        }
        if(this.green !== 'left' && this.direction == 'left' && this.currentNode == 1){
            this.path = [createVector(600,325),createVector(375,325)];  
            let dx = 500;
            let dy = 500;
            let carNumber = 0;
            for(var i = Cars.length-1; i >= 0 ; i--){
                if(this.pos.x - Cars[i].pos.x > 6 && this.pos.x - Cars[i].pos.x  < dx && Math.abs(this.pos.y-Cars[i].pos.y) < 20){
                    dx = this.pos.x - Cars[i].pos.x;
                    dy = Math.abs(this.pos.y-Cars[i].pos.y);
                    carNumber = i;
                }
            }
            if((this.pos.x -this.path[1].x) > dx){
                this.path = [createVector(0,275),createVector(Cars[carNumber].pos.x+25,Cars[carNumber].pos.y)];
            }
            this.arrival = true;
        } 
        if(this.green !== 'up' && this.direction == 'up' && this.currentNode == 1){
            this.path = [createVector(275,600),createVector(275,375)];
            let dx = 500;
            let dy = 500;
            let carNumber = 0;
            for(var i = Cars.length-1; i >= 0 ; i--){
                if(this.pos.y - Cars[i].pos.y > 6 && this.pos.y - Cars[i].pos.y  < dy && Math.abs(this.pos.x-Cars[i].pos.x) < 20){
                    dy = this.pos.y - Cars[i].pos.y;
                    dx = Math.abs(this.pos.x-Cars[i].pos.x);
                    carNumber = i;
                }
            }
            if((this.pos.y -this.path[1].y) > dy){
                this.path = [createVector(0,275),createVector(Cars[carNumber].pos.x,Cars[carNumber].pos.y+25)];
            }
            this.arrival = true;
        } 
        if(this.green !== 'down' && this.direction == 'down' && this.currentNode == 1){
            this.path = [createVector(325,0), createVector(325,225)];
            let dx = 500;
            let dy = 500;
            let carNumber = 0;
            for(var i = Cars.length-1; i >= 0 ; i--){
                if(Cars[i].pos.y - this.pos.y   > 6 && Cars[i].pos.y - this.pos.y  < dy && Math.abs(this.pos.x-Cars[i].pos.x) < 20){
                    dy = Cars[i].pos.y - this.pos.y;
                    dx = Math.abs(this.pos.x-Cars[i].pos.x);
                    carNumber = i;
                }
            }
            if((this.path[1].y -this.pos.y) > dy){
                this.path = [createVector(0,275),createVector(Cars[carNumber].pos.x,Cars[carNumber].pos.y-25)];
            }
            this.arrival = true;
        }
        if(this.green == 'right' && this.direction == 'right' && this.currentNode == 1){
            switch (this.turn){
                case "left":
                    this.path = this.rightDown;
                    break;
                case "right":
                    this.path = this.rightUp;
                break;
            }
            this.arrival = false;
        }
        if(this.green == 'left' && this.direction == 'left' && this.currentNode == 1){
            switch (this.turn){
                case "left":
                    this.path = this.leftDown;
                    break;
                case "right":
                    this.path = this.leftUp;
                break;
            } 
            this.arrival = false;
        } 
        if(this.green == 'up' && this.direction == 'up' && this.currentNode == 1){
            switch (this.turn){
                case "left":
                    this.path = this.upLeft;
                    break;
                case "right":
                    this.path = this.upRight;
                break;
            }
            this.arrival = false;
        } 
        if(this.green == 'down' && this.direction == 'down' && this.currentNode == 1){
            switch (this.turn){
                case "left":
                    this.path = this.downLeft;
                    break;
                case "right":
                    this.path = this.downRight;
                break;
            }
            this.arrival = false;
        }

    }


    update () {

        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(1, 1);
        this.heading = -atan2(this.velocity.x, this.velocity.y);
        this.acceleration.mult(0);
    }

    display(){
        push();
        angleMode(RADIANS)
        translate(this.pos.x, this.pos.y);       
        rotate(this.heading);
        fill('red');
        rectMode(CENTER);
        rect(0, 0, 10, 20);
        pop();
    };

}