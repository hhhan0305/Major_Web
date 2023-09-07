//let canvas = document.getElementById("canvas");
//let ctx = canvas.getContext("2d");

//ctx.fillRect(25, 25, 100, 100);   //사각형
//ctx.clearRect(45, 45, 60, 60);    //사각형 구멍
//ctx.strokeRect(50, 50, 50, 50);   //사각형 선

//ctx.beginPath();
//ctx.moveTo(75, 50);   // 시작 좌표를 정하고
//ctx.lineTo(100, 75);  // 시작좌표에서 부터 x,y
//ctx.lineTo(100, 25);
//ctx.fill();           // 그린 값을 채운다!
/*
ctx.beginPath();
ctx.moveTo(20, 20);
ctx.lineTo(130, 20);
ctx.lineTo(20, 130);
ctx.closePath();
ctx.fillStyle = "rgba(0,0,255,255)";
ctx.fill();

ctx.beginPath();
ctx.moveTo(30, 140);
ctx.lineTo(140, 140);
ctx.lineTo(140, 30);
ctx.closePath();
ctx.strokeStyle = "rgba(255,0,0,255)";
ctx.stroke();
*/

/*
ctx.fillStyle = "pink";
ctx.fillRect(25, 25, 100, 100);
*/
/*
ctx.globalAlpha = 0.2;

ctx.fillStyle = "#FD0";

ctx.fillRect(0, 0, 75, 75);
ctx.fillStyle = "#6C0";

ctx.fillRect(75, 0, 75, 75);
ctx.fillStyle = "#09F";

ctx.fillRect(0, 75, 75, 75);
ctx.fillStyle = "#F30";

ctx.fillRect(75, 75, 75, 75);
ctx.fillStyle = "#FFF";
*/

//ctx.font = "48px serif";
//ctx.strokeText("선린의 터를", 10, 50);

/*
ctx.font = "48px serif";
let count = 0;
function run() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (count > 622) {
    return;
  }
  count++;
  ctx.strokeText(count, 10, 50);
  requestAnimationFrame(run);
}
requestAnimationFrame(run);
*/

/*
ctx.font = "48px serif";
let count = 0;
let x = 0;
let y = 0;
let arr = " 안녕하세요 저는 누구누구 이고 당신은 누구누구 입니까?";
function run() {
  if (count > 622) {
    return;
  }
  count++;

  if (count % 5 == 0) {
    y += 100;
    ctx.strokeText(arr[count], count * 40, y);
  } else {
    ctx.strokeText(arr[count], count * 40, y);
  }
  setTimeout(() => {
    run();
  }, 150);
}
run();
*/
