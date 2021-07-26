class addCar {

    constructor( direction, turn){
        this.direction = direction;
        //console.log(this.direction);
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
            //this.heading = PI / 2;
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
            //this.heading = -PI / 2;
            break;
    }}

    follow(){
        
        this.target  = this.path[this.currentNode].copy();
        //console.log(this.distance(this.pos, this.target));
        if(this.pos.dist(this.target) <= 10){
           // if(this.distance(this.pos, this.target) <= 10){
            this.currentNode +=1;
            if(this.currentNode >= this.path.length){
                this.currentNode = this.path.length-1;
            }
        }
        //console.log(this.currentNode);
        if(this.target != null){
            this.seek(this.target);
        }
    }

    seek(target){
        this.target = target;
        //console.log(this.target);
        this.desired = this.target.sub(this.pos);
        this.desired.normalize();
        this.desired.mult(this.maxspeed);
        this.steer = this.desired.sub(this.velocity);
        this.steer.limit(this.maxforce);
        this.applyForce(this.steer);
    }

    // distance(a, b){
    //     this.a =a.copy();
    //     this.b = b.copy();
    //     //console.log(this.a.x, this.b.x);
    //     return Math.sqrt((this.a.x - this.b.x)*(this.a.x - this.b.x) + (this.a.y - this.b.y)*(this.a.y - this.b.y));
    // }

    applyForce(force){
        this.acceleration.add(force);
    }

    // signalcheck (red){
    //     this.red =red;
    //     if(this.red == 'left'){
    //         if(this.direction == 'left'&& this.currentNode == 1){
    //             let carV = createVector(0,0);
    //             // let m = createVector(275,350);
    //             // carV = m.sub(this.pos);
    //             // carV.mult(-1);
    //             // carV.normalize();
    //             //carV.limit(this.maxforce);
    //             //this.applyForce(carV);
    //             let d = map[carV , createVector(0,0), this.maxforce, this.pos, createVector(275,350)];
    //             console.log(d);
    //         }

    //     }
    // }

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
            //console.log(this.sum);
            this.sum.div(this.count);
            this.sum.normalize();
            this.sum.mult(this.maxspeed);
           // console.log(this.sum);
            this.sum.sub(this.velocity);
            this.sum.limit(this.maxforce)  
           // console.log(this.steer);
            //this.applyForce(this.steer);
            this.applyForce(this.sum);
        }


    }

    turning(ppos){
        this.ppos = ppos;
        if(this.direction == 'up'){
            switch (this.turn) {
                case null:
                    break;
                case "left":
                    if (this.pos.y < 350) {
                        this.acceleration.x = 0.02;
                        this.acceleration.y = 0;
                    }
                    break;
                case "right":
                    if (this.pos.y < 350) {
                        this.acceleration.x = -0.055;
                        this.acceleration.y = 0;
                    }
                    break;
            }
        }
        if(this.direction == 'down'){
           
            switch (this.turn) {
                case null:
                    break;
                case "left":
                    if (this.pos.y >= 250) {
                        this.acceleration.x = 0.055;
                        this.acceleration.y = 0;
                    }
                    break;
                case "right":
                    if (this.pos.y >= 250) {
                        this.acceleration.x = -0.02;
                        this.acceleration.y = 0;
                    }
                    break;
            }
        }
        
        if(this.direction == 'left'){
            switch (this.turn) {
                case null:
                    break;
                case "left":
                    if (this.pos.x > 250) {
                        this.acceleration.x = 0.00;
                        this.acceleration.y = 0.02;
                    }
                    break;
                case "right":
                    if (this.pos.x > 250) {
                        this.acceleration.x = 0.0;
                        this.acceleration.y = -0.055;
                    }
                    break;
            }
        }

        if(this.direction == 'right'){
            switch (this.turn) {
                case null:
                    break;
                case "left":
                    if (this.pos.x < 350) {
                        this.acceleration.x = 0.00;
                        this.acceleration.y = 0.055;
                    }
                    break;
                case "right":
                    if (this.pos.x < 350) {
                        this.acceleration.x = 0.0;
                        this.acceleration.y = -0.02;
                    }
                    break;
            }
        }
    }

    update () {
        // this.red = red;
        

        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(1, 1);
        this.heading = -atan2(this.velocity.x, this.velocity.y);
        //console.log(this.heading);
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