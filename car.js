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
        this.maxspeed = 1;

        switch (this.direction) {
        case "down":
            this.velocity.x = 0.0;
            this.velocity.y = 1.0;
            this.pos.x = 325;
            this.pos.y = 0;
            break;
        case "up":
            this.velocity.x = 0.0;
            this.velocity.y = -1.0;
            this.pos.x = 275;
            this.pos.y = 600;
            break;
        case "left":
            this.velocity.x = 1.0;
            this.velocity.y = 0.0;
            this.pos.x = 0;
            this.pos.y = 275;
            //this.heading = PI / 2;
            break;
        case "right":
            this.velocity.x = -1.0;
            this.velocity.y = 0.0;
            this.pos.x = 600;
            this.pos.y = 325;
            //this.heading = -PI / 2;
            break;
    }}

    applyForce(force){
        this.acceleration.add(force);
    }

    queue (cars){
        this.cars =cars;
        this.desiredseperation = 30;
        this.sum = createVector(0,0);
        this.count = 0;
        for(var i = this.cars.length - 1; i >= 0; i--){
            this.d = this.pos.dist(this.cars[cars.length-1].pos);
            if((this.d>0) && (this.d < this.desiredseperation)){
                this.diff = this.pos.sub(this.cars[i].pos);
                this.diff.normalize();
                this.diff.div(this.d);
                this.sum.add(this.diff);
                this.count++;
            }
        }
        if(this.count > 0){
            console.log(this.sum);
            this.sum.setMag(this.maxspeed);
            this.steer = this.sum.sub(this.velocity);
            this.steer.limit(this.maxforce);
            console.log(this.steer);
            this.applyForce(this.steer);
            
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