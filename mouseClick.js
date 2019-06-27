//смена типа башни
function changeTower(n) {
  currentTower = n;
}

//добавить башню
canvas.addEventListener('mousedown', function() {
  if(towerAllowed(mouse.x,mouse.y)) {
    towers.push(new towerClasses[currentTower](mouse.x,mouse.y));
    money -= towerClasses[currentTower].prototype.cost;
    document.getElementById('money').innerHTML = money; //обновить суму денег при добавлении башни
  }// end if

}, false);

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  mouse = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
} 
 
window.addEventListener('mousemove', getMousePos, false); 

//показать диапазон башни
function drawMouse() {
  //необходимо, если мышь не на холсте возвращает ошибку при первой загрузке
  if(!mouse) return;
  var range = towerClasses[currentTower].prototype.range;
  context.beginPath();
  //прозрачность
  context.globalAlpha = 0.2;
  context.arc(mouse.x,mouse.y,range, 0, 2*Math.PI);
  if(towerAllowed(mouse.x,mouse.y)) context.fillStyle='lime';
  else context.fillStyle = 'silver';
  context.fill();
  context.globalAlpha = 1;
}

//проверить, можно ли здесь построить башню:
//начинается в верхней части страницы
function towerAllowed(x,y) {
  if (money < towerClasses[currentTower].prototype.cost) return false; //может позволить себе башню?
  if( y < rectWidth*3) return false;
  else if (y < firstBorder+rectWidth*2 && x > rightBorder- rectWidth  ) return false;
  else if (y > firstBorder - rectWidth && y < firstBorder + rectWidth *2 && x > leftBorder - rectWidth) return false;
  else if (y > firstBorder + rectWidth*3 && y < secondBorder + rectWidth && x > leftBorder - rectWidth && x < leftBorder + rectWidth*2) return false;
  else if (y > secondBorder - rectWidth && y < secondBorder + rectWidth * 2 && x > leftBorder + rectWidth *2) return false;
  else if (y > secondBorder && y < thirdBorder + rectWidth*2 && x > rightBorder - rectWidth) return false;
  else if (y > thirdBorder - rectWidth && y < thirdBorder + rectWidth*2) return false;
  else {
    for (var i = 0, j = towers.length; i < j; i++) {
      //проверьте, не находится ли существующая башня слишком близко
      //простая прямоугольная проверка, возможно, потребуется перейти к круговой проверке в каком-либо пункте
      if(Math.abs(x-towers[i].x) < 2*rectWidth && Math.abs(towers[i].y-y) < 2*rectWidth) { return false };   
    } //конец для
  }
  return true;
}
