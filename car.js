function addCar(direction, turn) {
    // this.x = x;
    // this.y = y;
    this.direction = direction;
    this.turn = turn;
    this.pos = createVector(0, 0);
    this.heading = 0;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    switch (this.direction) {
        case "down":
            this.velocity.x = 0.0;
            this.velocity.y = 1.0;
            this.pos.x = 300;
            this.pos.y = 0;
            break;
        case "up":
            this.velocity.x = 0.0;
            this.velocity.y = -1.0;
            this.pos.x = 300;
            this.pos.y = 600;
            break;
        case "left":
            this.velocity.x = 1.0;
            this.velocity.y = 0.0;
            this.pos.x = 0;
            this.pos.y = 300;
            //this.heading = PI / 2;
            break;
        case "right":
            this.velocity.x = -1.0;
            this.velocity.y = 0.0;
            this.pos.x = 600;
            this.pos.y = 300;
            //this.heading = -PI / 2;
            break;
    }

    this.update = function () {

        if(this.direction == 'down' || this.direction == 'up'){
            switch (this.turn) {
                case null:
                    break;
                case "left":
                    if (this.pos.y < 300) {
                        this.acceleration.x = 0.02;
                        this.acceleration.y = 0;
                    }
                    break;
                case "right":
                    if (this.pos.y < 300) {
                        this.acceleration.x = -0.02;
                        this.acceleration.y = 0;
                    }
                    break;
            }
        }
        
        if(this.direction == 'left' || this.direction == 'right'){
            switch (this.turn) {
                case null:
                    break;
                case "left":
                    if (this.pos.x > 300) {
                        this.acceleration.x = 0.00;
                        this.acceleration.y = 0.02;
                    }
                    break;
                case "right":
                    if (this.pos.x > 300) {
                        this.acceleration.x = 0.0;
                        this.acceleration.y = -0.02;
                    }
                    break;
            }
        }

        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(1, 1);
        this.heading = -atan2(this.velocity.x, this.velocity.y);
        console.log(this.heading);
    }

    this.display = function () {
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