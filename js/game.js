const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

let player;
let cursors;
let enemies;
let lastEnemySpawn = 0;
let timerText;
let xp = 0;
let xpText;
let startTime;
let fireballs;
let fireKey;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('voltkit', 'assets/voltkit.png');
    this.load.image('background', 'assets/background.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('fireball', 'assets/fireball.png');
}

function create() {
    this.add.image(400, 300, 'background');

    player = this.physics.add.sprite(400, 300, 'voltkit');
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    enemies = this.physics.add.group();
    fireballs = this.physics.add.group();

    this.physics.add.overlap(fireballs, enemies, hitEnemy, null, this);

    timerText = this.add.text(16, 16, 'Time: 0:00', { fontSize: '20px', fill: '#ffffff' });
    xpText = this.add.text(16, 40, 'XP: 0', { fontSize: '20px', fill: '#ffffff' });

    startTime = this.time.now;
}

function update(time) {
    let speed = 200;
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
        player.setVelocityX(speed);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
        player.setVelocityY(speed);
    }

    if (Phaser.Input.Keyboard.JustDown(fireKey)) {
        shootFireball(this);
    }

    elapsed = Math.floor((this.time.now - startTime) / 1000);
    let minutes = Math.floor(elapsed / 60);
    let seconds = elapsed % 60;
    timerText.setText('Time: ' + minutes + ':' + (seconds < 10 ? '0' + seconds : seconds));

    if (time > lastEnemySpawn + 1000) {
        spawnEnemy(this);
        lastEnemySpawn = time;
    }
}

function shootFireball(scene) {
    let fireball = fireballs.create(player.x, player.y, 'fireball');
    fireball.setVelocityY(-300);
    fireball.setCollideWorldBounds(true);
    fireball.body.onWorldBounds = true;
    fireball.body.allowGravity = false;
}
    let fireball = fireballs.create(player.x, player.y, 'fireball');
    fireball.setVelocityY(-300);
}

function spawnEnemy(scene) {
    let x = Phaser.Math.Between(0, 800);
    let y = Phaser.Math.Between(0, 600);
    let enemy = enemies.create(x, y, 'enemy');
    scene.physics.moveToObject(enemy, player, 100);
}

function hitEnemy(fireball, enemy) {
    fireball.destroy();
    enemy.destroy(); xp += 10; xpText.setText('XP: ' + xp);
    xp += 10;
    xpText.setText('XP: ' + xp);
}
