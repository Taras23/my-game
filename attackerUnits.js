var enemies = [];
var addedLife = 0; //увеличивается в checkForDead ()

function Enemy(x,y) {
  this.x = x,
  this.y = y,
  this.life = this.maxLife + addedLife;
}

//общий для всех объектов Emeny
Enemy.prototype.maxLife = 40;
Enemy.prototype.speed = baseSpeed;
Enemy.prototype.color = 'black';

Enemy.prototype.draw = function() {
  context.beginPath();
  context.fillStyle = this.color;
  context.fillRect(this.x,this.y,rectWidth,rectWidth);
  //бар жизни
  context.fillStyle='orange';
  context.fillRect(this.x,this.y+rectWidth/3,rectWidth*this.life/(this.maxLife+addedLife),rectWidth/3);
};

Enemy.prototype.move = function() {
  var move = this.speed;
  if(this.x < rightBorder && this.y < firstBorder) this.x += move;
  else if (this.x >= rightBorder && this.y < firstBorder) this.y += move;
  else if (this.x >= leftBorder && this.y <= secondBorder) this.x -= move; 
  else if (this.x <= leftBorder && this.y <= secondBorder) this.y += move;
  else if (this.x <= rightBorder && this.y < thirdBorder) this.x += move;
  else if (this.x >= rightBorder  && this.y <= thirdBorder) this.y += move;
  else  {
    this.x -= move;
    //возвращает true, поэтому враг может быть удален, если другая функция
    if(this.x < 0) return true; 
  }
  return false;
};
 
function checkForDead() {
  for (var i = 0, j = enemies.length; i < j; i++ ) {
    if (enemies[i].life <=0) {
      addedLife = Math.floor(stopped/10) * (1 + Math.floor(stopped/100)); //используется, чтобы сделать врагов жестче, так как количество остановленных врагов увеличивается
      document.getElementById('stopped').innerHTML = ++stopped;
      money += moneyIncrement;
      document.getElementById('money').innerHTML = money;
      enemies.splice(i,1);
      i--;
      j--; 
    }
  }
}

var addEnemy = function() {
   var enemy;
   if(stopped > 20 && stopped < 180) { 
     var pick = Math.floor(Math.random()*enemyTypes1.length); 
	 
     //выберите случайный тип врага
     enemy = new enemyTypes[pick](0,rectWidth);
	  } else if(stopped >= 180){
		 var pick = Math.floor(Math.random()*enemyTypes.length);
	     enemy = new enemyTypes[pick](0,rectWidth);
   } else {
     enemy = new Enemy(0,rectWidth);
   }
  enemies.push(enemy);
}

//быстрее враг
var FastEnemy = function(x,y) {
  Enemy.call(this,x,y);
};
FastEnemy.prototype = Object.create(Enemy.prototype);
FastEnemy.prototype.constructor = FastEnemy;

FastEnemy.prototype.speed = Enemy.prototype.speed*1.4;
FastEnemy.prototype.color = 'lightsteelblue';

//сильный враг
var StrongEnemy = function(x,y) {
  Enemy.call(this,x,y);
};
StrongEnemy.prototype = Object.create(Enemy.prototype);
StrongEnemy.prototype.constructor = StrongEnemy;

StrongEnemy.prototype.color = 'midnightblue';
StrongEnemy.prototype.maxLife = Enemy.prototype.maxLife*2;

var StrongerEnemy = function(x,y) { //мощний
  Enemy.call(this,x,y);
};
StrongerEnemy.prototype = Object.create(Enemy.prototype);
StrongerEnemy.prototype.constructor = StrongerEnemy;

StrongerEnemy.prototype.color = 'red';
StrongerEnemy.prototype.speed = Enemy.prototype.speed*0.5;
StrongerEnemy.prototype.maxLife = Enemy.prototype.maxLife*11;


//список типов врагов
var enemyTypes = [Enemy,FastEnemy,StrongEnemy,StrongerEnemy];
var enemyTypes1 = [Enemy,FastEnemy,StrongEnemy];
