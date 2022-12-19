var c = document.getElementById("board");
var ctx = c.getContext("2d");
var width = 800;
var height = 800;
var radius = 14;
var blank = 15;
var turn = 1; // 1 black 2 white
let turnNum = -1;
let isStart = false;

var boardArray = new Array(25);
for (var i = 0; i < 25; i++) {
  boardArray[i] = new Array(25);
  for (var j = 0; j < 25; j++) {
    boardArray[i][j] = 0;
  }
}

function updateBoard() {
  // board fill color
  ctx.fillStyle = "#ffcc66";
  ctx.fillRect(0, 0, width, height);

  // board draw line
  ctx.strokeStyle = "#333300";
  ctx.fillStyle = "#333300";
  for (i = 0; i < 25; i++) {
    // horizontal line draw
    ctx.beginPath();
    ctx.moveTo(blank + i * 32, blank);
    ctx.lineTo(blank + i * 32, height - blank);
    ctx.stroke();

    // vertical line draw
    ctx.beginPath();
    ctx.moveTo(blank, blank + i * 32);
    ctx.lineTo(height - blank, blank + i * 32);
    ctx.stroke();
  }

  // board draw point
  var circleRadius = 3;
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      // board circle draw
      ctx.beginPath();
      ctx.arc(
        blank + 4 * 32 + i * 8 * 32,
        blank + 4 * 32 + j * 8 * 32,
        circleRadius,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
    }
  }

  // board draw clicked
  for (i = 0; i < 25; i++) {
    for (j = 0; j < 25; j++) {
      if (boardArray[i][j] === 1) {
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#000000";
        ctx.arc(blank + i * 32, blank + j * 32, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      } else if (boardArray[i][j] === 2) {
        ctx.beginPath();
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "#ffffff";
        ctx.arc(blank + i * 32, blank + j * 32, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    }
  }
}

updateBoard();

/* Mouse Event */
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function getMouseRoundPos(xPos, yPos) {
  var x = (xPos - blank) / 32;
  var resultX = Math.round(x);
  var y = (yPos - blank) / 32;
  var resultY = Math.round(y);

  return { x: resultX, y: resultY };
}

c.addEventListener(
  "mousemove",
  function (evt) {
    var mousePos = getMousePos(c, evt);
    drawNotClicked(mousePos.x, mousePos.y);
  },
  false
);

c.addEventListener(
  "mousedown",
  function (evt) {
    var mousePos = getMousePos(c, evt);
    isClicked(mousePos.x, mousePos.y);
  },
  false
);

function drawNotClicked(xPos, yPos) {
  var resultPos = getMouseRoundPos(xPos, yPos);

  if (
    resultPos.x > -1 &&
    resultPos.x < 28 &&
    resultPos.y > -1 &&
    resultPos.y < 25 &&
    boardArray[resultPos.x][resultPos.y] === 0
  ) {
    updateBoard();
    ctx.beginPath();
    ctx.globalAlpha = 0.8;
    if (turn < 2) {
      ctx.strokeStyle = "#000000";
      ctx.fillStyle = "#000000";
    } else {
      ctx.strokeStyle = "#ffffff";
      ctx.fillStyle = "#ffffff";
    }
    ctx.arc(
      blank + resultPos.x * 32,
      blank + resultPos.y * 32,
      radius,
      0,
      2 * Math.PI
    );
    ctx.fillText(
      `${resultPos.x} : ${resultPos.y}`,
      resultPos.x * 32 + blank - 16,
      resultPos.y * 32 + blank + 24
    );
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function isClicked(xPos, yPos) {
  var resultPos = getMouseRoundPos(xPos, yPos);
  if (
    resultPos.x > -1 &&
    resultPos.x < 25 &&
    resultPos.y > -1 &&
    resultPos.y < 25 &&
    boardArray[resultPos.x][resultPos.y] === 0
  ) {
    boardArray[resultPos.x][resultPos.y] = turn;
    checkOmok(turn, resultPos.x, resultPos.y);
    // turn 서버에서 전달
    if (!isStart) {
      turnNum = 2; // turn
      turn = 3 - turn; //turn change
      isStart = true;
    } else {
      if (turnNum === turn) {
        turnNum = 3 - turn;
      } else {
        turn = 3 - turn; //turn change
      }
    }
  }
  updateBoard();
}

/* is Omok?? */
function checkOmok(turn, xPos, yPos) {
  if (addOmok(turn, xPos, yPos, -1, -1) + addOmok(turn, xPos, yPos, 1, 1) === 5)
    alert(`Player ${turn} Win~~!!`);
  else if (addOmok(turn, xPos, yPos, 0, -1) + addOmok(turn, xPos, yPos, 0, 1) === 5)
    alert(`Player ${turn} Win~~!!`);
  else if (addOmok(turn, xPos, yPos, 1, -1) + addOmok(turn, xPos, yPos, -1, 1) === 5)
    alert(`Player ${turn} Win~~!!`);
  else if (addOmok(turn, xPos, yPos, -1, 0) + addOmok(turn, xPos, yPos, 1, 0) === 5)
    alert(`Player ${turn} Win~~!!`);
}

function addOmok(turn, xPos, yPos, xDir, yDir) {
  if (xPos + xDir < 0) return 0;
  if (xPos + xDir > 24) return 0;
  if (yPos + yDir < 0) return 0;
  if (yPos + yDir > 24) return 0;

  if (boardArray[xPos + xDir][yPos + yDir] === turn) {
    return 1 + addOmok(turn, xPos + xDir, yPos + yDir, xDir, yDir);
  } else {
    return 0;
  }
}
