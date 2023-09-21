const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let stage; // 현재 점수
let stageText; // 현재 점수 텍스트
let highstage; // 최고 점수
let highstageText; // 최고 점수 텍스트
let cat; // 고양이
let obstacles = []; // 장애물
let gameSpeed; // 게임 속도
let keys = {}; // 키 값

let tempSeoul;


//임시
let consloeLogX;
let consloeLogY;
document.addEventListener('keydown', function (evt) {
  keys[evt.code] = true;
});

document.addEventListener('keyup', function (evt) {
  keys[evt.code] = false;
});

class Cat {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
  Draw() {
    // ctx.beginPath();
    // ctx.fillStyle = this.c;
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    // ctx.closePath();
    let catImg = new Image();
    if (tempSeoul > 15) { // 지역을 바꿀 수도 있지만 간단하게 하기위해 온도 조건만 바꿉니다.

      if (keys['KeyW']) {
        catImg.src = 'cat_santa.png'
        ctx.drawImage(catImg, this.x, this.y, this.w, this.h);
      }
      else if (keys['KeyA']) {
        catImg.src = "cat_santa_L.png";
        ctx.drawImage(catImg, this.x, this.y, this.w, this.h);
      }
      else if (keys['KeyD']) {
        catImg.src = "cat_santa_R.png";
        ctx.drawImage(catImg, this.x, this.y, this.w, this.h);
      }
      else {
        catImg.src = "cat_santa.png";
        ctx.drawImage(catImg, this.x, this.y, this.w, this.h);
      }

    } else {

      if (keys['KeyW']) {
        catImg.src = "cat.png";
        ctx.drawImage(catImg, this.x, this.y, this.w, this.h);
      }
      else if (keys['KeyA']) {
        catImg.src = "cat_L.png";
        ctx.drawImage(catImg, this.x, this.y, this.w, this.h);
      }
      else if (keys['KeyD']) {
        catImg.src = "cat_R.png";
        ctx.drawImage(catImg, this.x, this.y, this.w, this.h);
      }
      else {
        catImg.src = "cat.png";
        ctx.drawImage(catImg, this.x, this.y, this.w, this.h);
      }
    }

  }

  Animate() {
    //===========고양이 이동제어============//
    if (keys['KeyW']) {
      this.y -= 10;
    }
    else if (keys['KeyA']) {
      this.x -= 10;
    }
    else if (keys['KeyS']) {
      //this.y += 10;
    }
    else if (keys['KeyD']) {
      this.x += 10;
    }

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.w > canvas.width) {
      this.x = canvas.width - this.w;
    }

    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.h > canvas.height) {
      this.y = canvas.height - this.h;
    }
    //===========^고양이 이동제어============//
    consloeLogX = this.x;
    consloeLogY = this.y;
    this.Draw();
  }
}

class Mouse {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  Update() {
    this.Draw();
  }

  Draw() {
    // ctx.beginPath();
    // ctx.fillStyle = this.c;
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    // ctx.closePath();
    let mouseImg = new Image();
    mouseImg.src = "mouse.png";
    ctx.drawImage(mouseImg, this.x, this.y, this.w, this.h);

  }
}

class Obstacle {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.dx = -gameSpeed; //게임 속도
  }
  Update() {
    this.x += this.dx;
    this.Draw();
    this.dx = -gameSpeed;
  }
  Draw() {
    // ctx.beginPath();
    // ctx.fillStyle = this.c;
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    // ctx.closePath();
    let boxImg = new Image();
    boxImg.src = "box.png";
    ctx.drawImage(boxImg, this.x, this.y, this.w, this.h);
  }
}

// function SpawnObstacle() {
//   //let size = RandomIntInRange(20, 70); //사이즈 랜덤 생성X
//   let Xsize = 200;
//   let Ysize = 200;
//   let type = RandomIntInRange(0, 1); // 0 = 박스, 1 = 가능하면 강아지
//   // let obstacle = new Obstacle(canvas.width + Xsize, canvas.height - Ysize - 220, Xsize, Ysize, '#2484E4'); //1층
//   //let obstacle = new Obstacle(canvas.width + Xsize, canvas.height - Ysize - 437, Xsize, Ysize, '#2484E4'); //2층
//   //let obstacle = new Obstacle(canvas.width + Xsize, canvas.height - Ysize - 657, Xsize, Ysize, '#2484E4'); //3층
//   obstacles.push(obstacle);
// }

function SpawnObstacle() {
  let yCoordinates = RandomIntInRange(0, 2); // 장애물이 생성될 줄

  let Xsize = 300;
  let Ysize = 200;

  let firstFloor = canvas.height - Ysize - 220;
  let secondFloor = canvas.height - Ysize - 437;
  let thirdFloor = canvas.height - Ysize - 657;

  let yCoordinatesArray = [firstFloor, secondFloor, thirdFloor];

  let obstacle = new Obstacle(canvas.width + Xsize, yCoordinatesArray[yCoordinates], Xsize, Ysize, '#2484E4');

  obstacles.push(obstacle);

  // if(yCoordinates == 0){
  //   let obstacle = new Obstacle(canvas.width + Xsize, firstFloor, Xsize, Ysize, '#2484E4');
  // }
  // else if(yCoordinates == 1){
  //   let obstacle = new Obstacle(canvas.width + Xsize, secondFloor, Xsize, Ysize, '#2484E4');
  // }
  // else if(yCoordinates == 2){

  // }

  //let obstacle = new Obstacle(canvas.width + Xsize, canvas.height - Ysize, Xsize, Ysize, '#2484E4');

}

function RandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = "20px sans-serif";

  gameSpeed = 3; //3 // 화면 속도 조절


  stage = 1;
  highstage = 1;

  if (localStorage.getItem('highstage')) {
    highstage = localStorage.getItem('highstage');
  }

  cat = new Cat(canvas.width / 2 - 30, canvas.height - 103, 100, 100, "black");
  mouse = new Mouse(canvas.width / 2 - 20, canvas.height - 1050, 65, 65, "gray");

  stageText = new Text("Stage: " + stage, 25, 25, "left", "#212121", "20");

  highstageText = new Text(
    "Highstage: " + highstage,
    canvas.width - 25,
    25,
    "right",
    "#212121",
    "20"
  );

  requestAnimationFrame(Update);
}

let initialSpawnTimer = 120; //200 // 초기 스폰 타이머
let spawnTimer = initialSpawnTimer;// 스폰 간격 조절

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cat.Draw();
  cat.Animate();
  mouse.Draw();

  if (stage == 11) {
    EndGame();
    return;
  }

  // spawnTimer--;
  // if (spawnTimer <= 0) { // 간격 늘렸다가 줄였다가
  //   SpawnObstacle();
  //   spawnTimer = initialSpawnTimer - gameSpeed * 8;
  //   if (spawnTimer < 60) {
  //     spawnTimer = 60;
  //   }
  spawnTimer--;

  if (spawnTimer <= 0) {
    SpawnObstacle();
    spawnTimer = Math.max(initialSpawnTimer - gameSpeed * 8, 60);
  }

  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];

    if (o.x + o.w < 0) { //장해물이 왼쪽 화면 밖을 나가면
      obstacles.splice(i, 1); //삭제
    }

    if (
      cat.x + cat.w > o.x &&
      cat.x < o.x + o.w &&
      cat.y + cat.h > o.y &&
      cat.y < o.y + o.h
    ) {
      init(); // 장애물에 닿았다면 초기화 함수 init 실행
      stage = 1;
    }
    o.Update(); //재귀?
  }
  let m = mouse;

  if (
    cat.x + cat.w > m.x &&
    cat.x < m.x + m.w &&
    cat.y + cat.h > m.y &&
    cat.y < m.y + m.h
  ) {
    init(); //mouse에 닿으면 speed&score++; && score 제외 초기화
    stage++;
    gameSpeed += 2.5; // 벨페
    initialSpawnTimer -= 10;
    spawnTimer = initialSpawnTimer;
  }

  gameSpeed = Math.min(gameSpeed, 150);
  initialSpawnTimer = Math.max(initialSpawnTimer, 80);

  m.Draw(); //재귀?

  stageText.t = "Stage: " + stage;
  stageText.Draw();

  if (stage > highstage) {
    highstage = stage;
    highstageText.t = "Highstage: " + highstage;
  }

  highstageText.Draw();
  /* 
  만약 쥐에 닿았다면 속도 증가하는 알고리즘
  gameSpeed += 0.003;
  */
  //gameSpeed = 10;

}

class Text {
  constructor(t, x, y, a, c, s) {
    this.t = t;
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.s = s;
  }

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.font = this.s + "px sans-serif";
    ctx.textAlign = this.a;
    ctx.fillText(this.t, this.x, this.y);
    ctx.closePath();
  }
}

function EndGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let gameOverImage = new Image();
  gameOverImage.src = 'leo.jpg';
  ctx.drawImage(gameOverImage, 0, 0, canvas.width, canvas.height);
}

function init() {
  cat.x = canvas.width / 2 - 30;
  cat.y = canvas.height - 103;
  //스테이지 토기화dw
  gameSpeed = 3;
  initialSpawnTimer = 100;
  spawnTimer = initialSpawnTimer;
  localStorage.setItem('highstage', highstage);
}
const getJSON = function (url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    const status = xhr.status;
    if (status == 200) {
      callback(null, xhr.response);
    }
    else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

getJSON("https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=df54b40e7c614cb48107fac285e16b9a&units=metric"
  ,
  function (err, data) {
    if (err != null) {
      alert("예상치 못한 오류 발생." + err);

    } else {
      tempSeoul = data.main.temp;
      // alert(`현재
      //   온도는 ${data.main.temp}°C
      //   풍속은 ${data.wind.speed}m/s
      //   습도는 ${data.main.humidity}%

      //   입니다.
      //   오늘의
      //     최고기온은 ${data.main.temp_max}
      //     최저기온은 ${data.main.temp_min}
      // 입니다.`)
    }
  })

Start();