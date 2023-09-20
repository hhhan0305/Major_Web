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
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
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
      this.y += 10;
    }
    else if (keys['KeyD']) {
      this.x += 10;
    }
    //===========^고양이 이동제어============//
    consloeLogX = this.x;
    consloeLogY = this.y;
    this.Draw();
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
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
}

function SpawnObstacle() {
  //let size = RandomIntInRange(20, 70); //사이즈 랜덤 생성X
  let Xsize = 100;
  let Ysize = 70
  let type = RandomIntInRange(0, 1); // 0 = 박스, 1 = 가능하면 강아지
  let obstacle = new Obstacle(canvas.width + Xsize, canvas.height - Ysize, Xsize, Ysize, '#2484E4');
  obstacles.push(obstacle);
}

function SpawnManyObstacles(){
  let yCoordinates = RandomIntInRange(0,2); // 장애물이 생성될 줄
  let Xsize = 100;
  let Ysize = 70
  let yCoordinatesArray = [1, 2, 3];
  let type = RandomIntInRange(0, 1); // 0 = 박스, 1 = 가능하면 강아지
  let obstacle = new Obstacle(canvas.width + Xsize, canvas.height - Ysize, Xsize, Ysize, '#2484E4');
  obstacles.push(obstacle);
}

function RandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = "20px sans-serif";

  gameSpeed = 3;

  stage = 0;
  highstage = 0;

  if(localStorage.getItem('highstage')){
    highstage=localStorage.getItem('highstage');
  }

  cat = new Cat(canvas.width / 2 - 20, canvas.height - 53, 50, 50, "black");

  stageText=new Text("Stage: "+ stage,25,25,"left","#212121","20");

  requestAnimationFrame(Update);
  console.log(consloeLogX);
  console.log(consloeLogY);
}

let initialSpawnTimer = 200;
let spawnTimer = initialSpawnTimer;

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cat.Draw();
  cat.Animate();

  spawnTimer--;
  if (spawnTimer <= 0) {
    SpawnObstacle();
    spawnTimer = initialSpawnTimer - gameSpeed * 8;
    if (spawnTimer < 60) {
      spawnTimer = 60;
    }
  }
  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];
    o.Update();
  }

  stageText.t="Stage: "+stage;
  stageText.Draw();

  if(stage>highstage){
    highstage=stage;
    highstageText.t="Highstage: "+highstage;
  }

  //highstageText.Draw();
  /* 
  만약 쥐에 닿았다면 속도 증가하는 알고리즘
  gameSpeed += 0.003;
  */
  
}

class Text{
  constructor(t,x,y,a,c,s){
    this.t=t;
    this.x=x;
    this.y=y;
    this.a=a;
    this.c=c;
    this.s=s;
  }

  Draw(){
    ctx.beginPath();
    ctx.fillStyle=this.c;
    ctx.font=this.s+"px sans-serif";
    ctx.textAlign=this.a;
    ctx.fillText(this.t,this.x,this.y);
    ctx.closePath();
  }
}

function init(){

  window.localStorage.setItem('highstage',highstage);
}

Start();
