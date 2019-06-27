var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d'),
rectWidth = 20, //основной размер игрового устройства (в пикселях)
maxWidth = canvas.width, //можно добавить maxHight, если не идеальный квадрат
FPS = 30,
baseSpeed = 4*rectWidth/FPS,
mouse, //мышь х и у для диапазона рисования
currentTower = 0, //селектор типа башни.
//границы для пути атакующего
leftBorder = maxWidth/6,
rightBorder = maxWidth/6*5,
//вертикальные границы:
firstBorder = maxWidth/4,
secondBorder = maxWidth/4*2,
thirdBorder = maxWidth/4*3,
//очек / статистика
attackerPoints = 0,
stopped = 0,
//счетчик, когда добавлять вражеские юниты
addEnemyTimer = 60,
money = 250,
moneyIncrement = 7.5;


//рисовать вещи графика

mainLoopRender = function() {
  context.beginPath();
  context.clearRect(0,0,canvas.width,canvas.height);
  for(var i =0, j = enemies.length; i < j; i ++ ) {
	enemies[i].draw();
  }
  for(var i = 0, j = towers.length; i < j; i++ ) {
    towers[i].draw();
  }
  for(var i = 0, j = bullets.length; i < j; i++) {
    bullets[i].draw();
  }
  drawMouse(); //потенциальный радиус пушки
  requestAnimationFrame(mainLoopRender);
};

//игровая логика (отдельно от графики)
mainLoopLogic = function() {
	if(stopped >= 454){
		alert('Ви перемогли');
		stopped=0;
		window.location.reload();
		}
		 if(attackerPoints == 15){
		  alert('Завдання проваленно!\nДиверсійна група пройшла'); 
		  attackerPoints=0;
			window.location.reload();		  
		  }
  checkForDead();
  addEnemyTimer--;
  if(addEnemyTimer<1) {
    addEnemy();
    addEnemyTimer = (stopped > 40) ? 20 : 30;  //как быстро генерируеться новый враг
  }
  for(var i =0, j = enemies.length; i < j; i ++ ) {
    //истина, если атакующий прошел
    if(enemies[i].move()){
      attackerPoints++;
      //добавить точку за пределами холста
      document.getElementById('attackersScore').innerHTML = attackerPoints; 
      enemies.splice(i,1);
      i--;
      j--;
    }
  }
  for(var i = 0, j = towers.length; i < j; i++ ) {
    towers[i].findTarget();
    towers[i].findUnitVector();
    towers[i].fire();
  }
  //перемещать пули, проверять попадания, удалять пули при попадании
  for(var i = 0, j = bullets.length; i < j; i++) {
    bullets[i].move();
    if(bullets[i].checkCollision()) {
     bullets.splice(i,1);
     j--;
     i--;
    }
  }
  setTimeout(mainLoopLogic, 1000/FPS);
};
window.onload = function() {
 requestAnimationFrame(mainLoopRender);
 setTimeout(mainLoopLogic, 1000/FPS);
  	
 
};

