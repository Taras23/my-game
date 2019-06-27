//оборонительные башни
//опорная башня
var towers=[];

function Tower(x,y) {
  this.x = x,
  this.y = y
}
//солдат
Tower.prototype.r = rectWidth; //радиус
Tower.prototype.rateOfFire = FPS; //менше означає більше кулі в секунду
Tower.prototype.range = rectWidth*5;
Tower.prototype.hurt = Enemy.prototype.maxLife/6;
Tower.prototype.color = 'blue';
Tower.prototype.cost = 50;

Tower.prototype.findTarget = function() {
  //если нет врага нет цели
  if(enemies.length === 0) {
    this.target = null;
    return;
  }
  //если цель мертва, удалить ссылку на цель
  if(this.target && this.target.life <= 0) {
    this.target = null;
  }
  //найти первого врага в радиусе действия и выбрать его в качестве цели башни
  for (var i = 0, j = enemies.length; i < j; i ++) {
    var dist = (enemies[i].x-this.x)*(enemies[i].x-this.x+rectWidth)+(enemies[i].y-this.y)*(enemies[i].y-this.y+rectWidth); //Параметр rectWidth включен для просмотра центра прямоугольника, а не верхнего левого угла
if (dist < (this.range*this.range)) { //квадрат диапазона.  Math.sqrt,  требует больше ресурсов
	 this.target = enemies[i];//нужна только одна цель
      return; 
    }
  }
};

Tower.prototype.findUnitVector = function() {
  if (!this.target) return false; //если нет цели, не беспокойтесь о расчете единичного вектора
  var xDist = this.target.x-this.x;
  var yDist = this.target.y-this.y;
  var dist = Math.sqrt(xDist*xDist+yDist*yDist); //cума квадратов катетов равна квадрату гипотенузе
  this.xFire = this.x+this.r*xDist/dist; //где заканчивается башня
  this.yFire = this.y+this.r*yDist/dist;
};

Tower.prototype.draw= function() {
  //нарисовать круг
  context.beginPath();
  context.fillStyle = this.color;
  context.arc(this.x,this.y,this.r,0,2*Math.PI);
  context.fill();
  context.stroke();
  //нарисовать башню
  context.beginPath();
  context.moveTo(this.x,this.y);
  context.lineTo(this.xFire,this.yFire);
  context.lineWidth = 3;
  context.stroke();
  context.lineWidth = 1;
};

Tower.prototype.fire = function() {
  this.rateOfFire--;
  if(this.target && this.rateOfFire <=0) {
    bullets.push(new Bullet(this.xFire,this.yFire,this.target,this.hurt));
    //сбросить эти объекты rateOfFire к прототипам
    this.rateOfFire = this.constructor.prototype.rateOfFire;
  };
};

//другие виды башен
//башня дальнего действия:

var Tower2 = function(x,y) { //снайпер
  Tower.call(this,x,y);
}
Tower2.prototype = Object.create(Tower.prototype);
Tower2.prototype.constructor = Tower2;

Tower2.prototype.range = Tower.prototype.range*1.5;//смотреть на удвоенную площадь, а не радиус или диапазон
Tower2.prototype.hurt = Enemy.prototype.maxLife/3;
Tower2.prototype.color = 'yellow';
Tower2.prototype.cost = Tower.prototype.cost * 1.5;
Tower2.prototype.rateOfFire = Tower.prototype.rateOfFire * 1.5;

//башня с малой дальностю и с высоким уроном
var Tower3 = function(x,y) { //гранатометник
  Tower.call(this,x,y);
}
Tower3.prototype = Object.create(Tower.prototype);
Tower3.prototype.constructor = Tower3;

Tower3.prototype.range = Tower.prototype.range * 0.7; //0,7, заместь 0,5, потому что смотрим на площадь
Tower3.prototype.rateOfFire = Tower.prototype.rateOfFire* 1.3
Tower3.prototype.hurt = Tower.prototype.hurt*15;
Tower3.prototype.color = 'red';
Tower3.prototype.cost = Tower.prototype.cost * 5;

var Tower4 = function(x,y) { //кудеметник
  Tower.call(this,x,y);
}
Tower4.prototype = Object.create(Tower.prototype);
Tower4.prototype.constructor = Tower4;
Tower4.prototype.rateOfFire = Tower.prototype.rateOfFire * 0.1
Tower4.prototype.range = Tower.prototype.range * 0.9; //0,9, заместь 0,5, потому что смотрим на площадь
Tower4.prototype.hurt = Tower.prototype.hurt * 1.5;
Tower4.prototype.color = '#151515';
Tower4.prototype.cost = Tower.prototype.cost * 6.5;

//заселить массив башен
//это используется, чтобы выяснить, какие
//класс башни, чтобы добавить, когда мышь нажата
var towerClasses = [Tower,Tower2,Tower3,Tower4];

