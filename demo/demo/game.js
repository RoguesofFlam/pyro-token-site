const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: canvas.width / 2, y: canvas.height / 2, size: 20, color: "orange" };
let bullets = [];
let enemies = [];

function spawnEnemy() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  enemies.push({ x, y, size: 16, color: "green" });
}

function shoot() {
  bullets.push({ x: player.x, y: player.y, size: 5, dx: 4, dy: 0 });
}

setInterval(shoot, 500);
setInterval(spawnEnemy, 1000);

function update() {
  bullets.forEach(b => b.x += b.dx);
  bullets = bullets.filter(b => b.x < canvas.width);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);

  bullets.forEach(b => {
    ctx.fillStyle = "red";
    ctx.fillRect(b.x, b.y, b.size, b.size);
  });

  enemies.forEach(e => {
    ctx.fillStyle = e.color;
    ctx.fillRect(e.x - e.size/2, e.y - e.size/2, e.size, e.size);
  });

  requestAnimationFrame(update);
}

update();

