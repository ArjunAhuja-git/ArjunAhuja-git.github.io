var gravity = 0.1;

//constructor func for drops
function Drop(x, prevTime) {
  this.x = x;
  this.y = 10;
  this.length = random(3,10);
  this.speed = 1;
  this.time = prevTime;
  this.r = 0;
  
  this.show = function() {
   	stroke(255);
	push();
	translate(this.x,this.y);
	beginShape();
	strokeWeight(1);
	vertex(0,-5);
	quadraticVertex(3, 0, 0, 1);
	quadraticVertex(-3,0, 0, -5);
	endShape(CLOSE);
	pop();
  };
  
  this.time_update = function(time) {
    this.time = time;
  };
  
  this.move = function(speed) {
    this.y = this.y + speed;
    this.speed = speed + gravity;
  };
  
}

var drop;


function setup() {
  createCanvas(800, 800);
  noFill();
 
  dropsec = new Drop(200, 0);
  dropsec.time_update(second());
  dropmin = new Drop(400, 0);
  dropmin.time_update(minute());
  drophr = new Drop(600, 0);
  drophr.time_update(hour());
  
  ellipse(dropsec.x, 620, dropsec.time*2, dropsec.time)
  ellipse(dropmin.x, 620, dropmin.time*2, dropmin.time)
  ellipse(drophr.x, 620, drophr.time*2, drophr.time)
}

function draw() {
  background(0);

  if (dropsec.y >= 600) {
    //make an elipse here.
    dropsec2 = new Drop(200, dropsec.time);
    dropsec.time_update(second());
    dropsec.r++;
    ellipse(dropsec.x, 620,dropsec.time*3, dropsec.time*2);
    stroke(255, map(dropsec.r, 0, 50, 255, 0));
    ellipse(dropsec.x, 620, Math.min(dropsec.time*3, dropsec.r*3), Math.min(dropsec.r*2, dropsec.time*2));
    
    if(dropsec.r>50) {
      dropsec = dropsec2
    }
  } else {
    dropsec.show();
    dropsec.move(20);
    ellipse(dropsec.x, 620, dropsec.time*3, dropsec.time*2);
  }
  
  //console.log(dropsec.time, second());
  
  if (dropmin.y >= 619) {
    //make an elipse here.
    dropmin2 = new Drop(400, dropmin.time);
    dropmin.time_update(minute());
    
    if (dropmin.time > dropmin2.time) {
      console.log(minute());
    }
    dropmin.r++;
    ellipse(dropmin.x, 620,dropmin.time*3, dropmin.time*2);
    stroke(255, map(dropmin.r, 0, 50, 255, 0));
    ellipse(dropmin.x, 620, Math.min(dropmin.time*3, dropmin.r*3), Math.min(dropmin.r*2, dropmin.time*2));
    
    if(dropmin.r>50) {
      dropmin = dropmin2
    }
  } else {
    dropmin.show();
    dropmin.move(1);
    ellipse(dropmin.x, 620, dropmin.time*3, dropmin.time*2);
  }
  
  if (drophr.y >= 619) {
    //make an elipse here.
    drophr2 = new Drop(600, drophr.time);
    drophr.time_update(hour());
    drophr.r++;
    ellipse(drophr.x, 619,drophr.time*3, drophr.time*2);
    stroke(255, map(drophr.r, 0, 50, 255, 0));
    ellipse(drophr.x, 620, Math.min(drophr.time*3, drophr.r*3), Math.min(drophr.r*2, drophr.time*2));
    
    if(drophr.r>50) {
      drophr = drophr2
    }
  } else {
    drophr.show();
    drophr.move(0.5);
    ellipse(drophr.x, 620, drophr.time*3, drophr.time*2);
  }
}