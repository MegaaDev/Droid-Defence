const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const space = document.querySelector(".space");
const base = document.querySelector(".base");
const villain1 = document.querySelector(".villain1");
const pause = document.querySelector(".pause");

const resume = document.querySelector(".resume");
const bgMusic = new Audio("bgMusic.mp3");
const shootSound = new Audio("shoot.mp3");

let villainDropBool = false;
bgMusic.addEventListener(
  "ended",
  function () {
    this.currentTime = 0;
    this.play();
    this.volume - 0.5;
  },
  false
);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let centreX = canvas.width / 2;
let centreY = canvas.height / 2;

addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  centreX = canvas.width / 2;
  centreY = canvas.height / 2;
  if (highScore < score) {
    highScore = score;
    localStorage.setItem("high_score", highScore);
  }
  cancelAnimationFrame(animateit);
  villainBool = false;
  soundBool = false;
  bgMusic.pause();

  setTimeout(() => {
    villainDropBool = false;
    villainDropBool1 = false;
    villainsArray = [];
    init();
    VillainSpawn();
    animateit = requestAnimationFrame(animate);

    looseBool = false;
    looseBoolPlayer = false;
    villainBool = true;
    soundBool = true;
    bgMusic.play();
    bgMusic.volume = 0.5;
  }, 2000);
});

function distance(x, y, otherx, othery) {
  var x = x - otherx;
  var y = y - othery;
  var distanceit = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  return distanceit;
}

function randomRangeGenerator(min, max) {}

function Player(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.radius = radius;
  this.color = color;
  this.speed = 5;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();

    // c.drawImage(this.image, this.position.x, this.position.y);
  };

  this.update = function () {
    if (
      player.y - player.radius + player.dy < 0 ||
      player.y + player.radius + player.dy > canvas.height
    ) {
      player.dy = 0;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}
function VillainBot(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = 1;
  this.dy = 1;

  this.radius = radius;
  this.color = color;
  this.speed = 5;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();

    // c.drawImage(this.image, this.position.x, this.position.y);
  };

  this.update = function () {
    if (
      this.x - this.radius + this.dx < 50 ||
      this.x + this.radius + this.dx > canvas.width - canvas.width / 5
    ) {
      this.dx = -this.dx;
    }
    if (
      this.y - this.radius + this.dy < canvas.height / 20 &&
      villainDropBool
    ) {
      this.dy = -this.dy;
    }
    if (this.y + this.radius + this.dy > canvas.height / 4) {
      villainDropBool = true;
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}
function VillainBot1(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = 1;
  this.dy = 1;

  this.radius = radius;
  this.color = color;
  this.speed = 5;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();

    // c.drawImage(this.image, this.position.x, this.position.y);
  };

  this.update = function () {
    if (
      this.x - this.radius + this.dx < 50 ||
      this.x + this.radius + this.dx > canvas.width - canvas.width / 5
    ) {
      this.dx = -this.dx;
    }
    if (
      this.y - this.radius + this.dy < canvas.height / 20 &&
      villainDropBool1
    ) {
      this.dy = -this.dy;
    }
    if (this.y + this.radius + this.dy > canvas.height / 4) {
      villainDropBool1 = true;
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}
function TurretBot(bot) {
  this.bot = bot;
  this.draw = function () {
    let angle = Math.atan2(
      homeBase.y + homeBase.h / 2 - bot[0].y,
      homeBase.x + homeBase.w / 2 - bot[0].x
    );

    c.beginPath();

    c.moveTo(bot[0].x, bot[0].y);
    c.lineTo(bot[0].x + 60 * Math.cos(angle), bot[0].y + 60 * Math.sin(angle));
    c.strokeStyle = "grey";
    c.lineWidth = 25;
    c.stroke();
  };

  this.update = function () {
    this.draw();
  };
}
function TurretBot1(bot) {
  this.bot = bot;
  this.draw = function () {
    let angle = Math.atan2(player.y - bot[0].y, player.x - bot[0].x);

    c.beginPath();

    c.moveTo(bot[0].x, bot[0].y);
    c.lineTo(bot[0].x + 60 * Math.cos(angle), bot[0].y + 60 * Math.sin(angle));
    c.strokeStyle = "grey";
    c.lineWidth = 25;
    c.stroke();
  };

  this.update = function () {
    this.draw();
  };
}
function Base(x, y, w, h) {
  this.x = x;
  this.y = y;

  this.w = w;
  this.h = h;

  this.draw = function () {
    c.beginPath();
    c.rect(this.x, this.y, this.w, this.h);
    c.fillStyle = `purple`;
    c.fill();
  };

  this.update = function () {
    this.draw();
  };
}
function Bullets(x, y, radius, velocity, color) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.velocity = velocity;

  this.radius = radius;
  this.color = color;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  };

  this.update = function () {
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.draw();
  };
}
function Bullets1(x, y, radius, velocity, color) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.velocity = velocity;

  this.radius = radius;
  this.color = color;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  };

  this.update = function () {
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.draw();
  };
}

function Turret(x, y, aimX, aimY) {
  this.x = x;
  this.y = y;
  // this.w = w;
  // this.h = h;
  this.aimX = aimX;
  this.aimY = aimY;

  this.draw = function () {
    c.beginPath();
    // // c.rotate(rotate);
    // c.rect(this.x, this.y, this.w, this.h);
    // c.fillStyle = "green";
    // c.fill();

    c.moveTo(this.x, this.y);
    c.lineTo(this.x + this.aimX, this.y + this.aimY);
    c.strokeStyle = "grey";
    c.lineWidth = 25;
    c.stroke();
  };

  this.update = function () {
    this.draw();
  };
}
function Text(x, y) {
  this.x = x;
  this.y = y;

  this.draw = function () {
    c.fillStyle = "white";
    c.font = "bold 20pt roboto";

    c.fillText(`Score: ${score}`, x, y);
  };

  this.update = function () {
    this.draw();
  };
}
function TextForHighscore(x, y) {
  this.x = x;
  this.y = y;

  this.draw = function () {
    c.fillStyle = "white";
    c.font = "bold 20pt roboto";

    c.fillText(`HighScore: ${highScore}`, x, y);
  };

  this.update = function () {
    this.draw();
  };
}

function pauseAndResume(image) {
  this.image = image;
  this.draw = function () {
    c.drawImage(
      this.image,
      canvas.width - canvas.width / 20,
      canvas.height - canvas.height / 10,
      70,
      70
    );
  };

  this.update = function () {
    this.draw();
  };
}
function Villain(x, y, w, h, velocity) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.radius = 40;
  this.velocity = velocity;

  this.draw = function () {
    c.drawImage(villain1, this.x, this.y, this.w, this.h);
  };

  this.update = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw();
  };
}
function powerUpSpawnBullet(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = radius;
  this.dx = 3;
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;

    c.fill();
    c.closePath();
  };

  this.update = function () {
    if (
      this.x - this.radius < canvas.width / 10 ||
      this.x + this.radius > canvas.width - canvas.width / 10
    ) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.draw();
  };
}
function powerUpSpawnLife(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = radius;
  this.dy = 5;
  this.dx = 5;
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;

    c.fill();
    c.closePath();
  };

  this.update = function () {
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.dx = -this.dx;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}
function powerUpSpawnLifePlayer(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = radius;
  this.dy = 5;
  this.dx = -5;
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;

    c.fill();
    c.closePath();
  };

  this.update = function () {
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.dx = -this.dx;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}
function BaseLife(x, y, w, h, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.w = w;
  this.h = h;

  this.draw = function () {
    c.beginPath();
    c.fillStyle = this.color;
    c.rect(this.x, this.y, this.w, this.h);

    c.fill();
    c.closePath();
  };

  this.update = function () {
    this.draw();
  };
}
let lifeCountVillain = 60;
let lifeCountVillain1 = 60;

let turretbot;
let speedBool;
let ispeed;
let bulletBool;
let villains = [];
let villainbot;
let pauseResume;
let imageContainer;
let baseLife;
let player;
let turret;
let rotate = 90;
let boolLeft = true;
let boolUp = true;
let boolDown = true;
let boolRight = true;
let move;
let homeBase;
let bullets = [];
let animateit;
let mouse;
let score = 0;
let text;
let highScoreText;
let homeBaseLife;
let lifeCount = 400;
let lifeCountPlayer = 70;
let looseBoolPlayer = false;
let looseBool = false;
let fpscount;
let spawnBulletPowerUp;
let spawnArray = [];
let spawnArrayLife = [];
let spawnArrayLifePlayer = [];
let animateMe;
let boolForSpawnLife;
let boolForSpawnLifePlayer;
let animateUs;
let boolForSpawn;
let villainBool;
let index = 0;
let villainsArray = [];
let villainSpawnBool;
let bullets1 = [];
let homeBaseLife1;
let lifeShowerBoolForVillain = true;
let lifeShowerBoolForVillain1 = true;

let boolForbulletCollision = false;
let villainsArray1 = [];
let soundBool = true;
let villainSpawnBool1;
let boolForbulletCollision1;
let highScore = localStorage.getItem("high_score") || 0;
let villainDropBool1 = false;
let turretbot1;
const deployVillainBot1 = () => {
  setTimeout(() => {
    villainDropBool = false;
    villainsArray.push(
      new VillainBot(
        Math.random() * (canvas.width - canvas.width / 4 + 50) + 50,
        -100,
        30,
        `hsl(${Math.random() * 360},50%,50%)`
      )
    );
    lifeCountVillain = 60;
    lifeShowerBoolForVillain = true;
    villainSpawnBool = true;
    boolForbulletCollision = true;
  }, 5000);
};
const deployVillainBot2 = () => {
  setTimeout(() => {
    villainDropBool1 = false;

    villainsArray1.push(
      new VillainBot1(
        Math.random() * (canvas.width - canvas.width / 4 + 50) + 50,
        -100,
        30,
        `hsl(${Math.random() * 360},50%,50%)`
      )
    );

    lifeCountVillain1 = 60;
    lifeShowerBoolForVillain1 = true;

    villainSpawnBool1 = true;
    boolForbulletCollision1 = true;
  }, 10000);
};
const init = () => {
  villainsArray1 = [];
  score = 0;
  lifeCountVillain = 60;
  lifeCountVillain1 = 60;
  villains = [];
  lifeCount = 400;
  lifeCountPlayer = 70;
  lifeShowerBoolForVillain = true;
  lifeShowerBoolForVillain1 = true;

  boolForbulletCollision = false;
  villainSpawnBool1 = false;
  boolForbulletCollision1 = false;
  villainSpawnBool = false;
  villainBool = true;
  boolForSpawn = false;
  boolForSpawnLife = false;
  boolForSpawnLifePlayer = false;

  spawnArrayLife = [];
  spawnArrayLifePlayer = [];

  spawnArray = [];
  speedBool = false;
  ispeed = 1000;
  bulletBool = false;
  imageContainer = pause;
  pauseResume = new pauseAndResume(imageContainer);
  fpscount = 60;
  mouse = {
    x: 500,
    y: 100,
  };

  deployVillainBot1();

  deployVillainBot2();
  player = new Player(
    canvas.width / 8,
    canvas.height - canvas.height / 10,
    30,
    "blue"
  );
  rotate = 90;
  baseLife = new BaseLife(50, 50, 400, 30, "grey");
  bullets1 = [];
  bullets = [];
  text = new Text(canvas.width - canvas.width / 6, 70);
  highScoreText = new TextForHighscore(canvas.width - canvas.width / 6, 130);
  homeBase = new Base(
    centreX - 150 / 2,
    canvas.height - canvas.height / 3.5,
    150,
    150
  );
  looseBoolPlayer = false;
  looseBool = false;
  move = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
    space: {
      pressed: false,
    },
    up: {
      pressed: false,
    },
    down: {
      pressed: false,
    },
  };
};
villainDropBool = false;
villainDropBool1 = false;
init();
const VillainSpawn = () => {
  if (villainBool) {
    setTimeout(() => {
      animateUs = requestAnimationFrame(VillainSpawn);
      let x;
      let y;
      x = Math.random() * canvas.width;
      y = -40;
      let h;
      let w;
      h = 50;
      w = 50;
      let angle = Math.atan2(
        homeBase.y + homeBase.h / 2 - (y + h / 2),
        homeBase.x + homeBase.w / 2 - (x + w / 2)
      );
      // console.log(angle);

      let velocity = {
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2,
      };
      villains.push(
        new Villain(x, y, w, h, {
          x: velocity.x,
          y: velocity.y,
        })
      );
    }, ispeed);
    setTimeout(() => {
      if (!speedBool) ispeed -= 25;
      if (ispeed < 800) {
        speedBool = true;
      }
    }, 3000);
  }
};

VillainSpawn();

const bulletPowerUp = () => {
  if (bulletBool) {
    setTimeout(() => {
      animateMe = requestAnimationFrame(bulletPowerUp);
      let angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
      const velocity = {
        x: Math.cos(angle) * 9,
        y: Math.sin(angle) * 9,
      };
      bullets.push(
        new Bullets(
          player.x,
          player.y,
          9,
          {
            x: velocity.x,
            y: velocity.y,
          },
          "blue"
        )
      );
      shootSound.currentTime = 0;
      shootSound.play();
    }, 50);
  }
};

setInterval(() => {
  if (villainSpawnBool) {
    console.log("trueeee");

    let angle = Math.atan2(
      homeBase.y + homeBase.h / 2 - villainsArray[0].y,
      homeBase.x + homeBase.w / 2 - villainsArray[0].x
    );
    const velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5,
    };
    bullets1.push(
      new Bullets1(
        villainsArray[0].x,
        villainsArray[0].y,
        9,
        {
          x: velocity.x,
          y: velocity.y,
        },
        "red"
      )
    );
  }
}, 3000);
setInterval(() => {
  if (villainSpawnBool1) {
    let angle = Math.atan2(
      player.y - villainsArray1[0].y,
      player.x - villainsArray1[0].x
    );
    const velocity = {
      x: Math.cos(angle) * 5,
      y: Math.sin(angle) * 5,
    };
    bullets1.push(
      new Bullets1(
        villainsArray1[0].x,
        villainsArray1[0].y,
        9,
        {
          x: velocity.x,
          y: velocity.y,
        },
        "red"
      )
    );
  }
}, 3000);

setInterval(() => {
  if (spawnArray.length === 0) {
    spawnArray = [
      new powerUpSpawnBullet(canvas.width / 10 + 21, 200, 20, "orange"),
    ];
    boolForSpawn = true;
  }
  setTimeout(() => {
    if (spawnArray.length !== 0) {
      spawnArray.splice(0, 1);
      boolForSpawn = false;
    }
  }, 9000);
}, 20000);

setInterval(() => {
  if (spawnArrayLife.length === 0) {
    spawnArrayLife = [
      new powerUpSpawnLife(canvas.width / 2, 200, 15, "purple"),
    ];
    boolForSpawnLife = true;
  }
  setTimeout(() => {
    if (spawnArrayLife.length !== 0) {
      spawnArrayLife.splice(0, 1);
      boolForSpawnLife = false;
    }
  }, 10000);
}, 40000);
setInterval(() => {
  if (spawnArrayLifePlayer.length === 0) {
    spawnArrayLifePlayer = [
      new powerUpSpawnLife(canvas.width / 2, 200, 15, "blue"),
    ];
    boolForSpawnLifePlayer = true;
  }
  setTimeout(() => {
    if (spawnArrayLifePlayer.length !== 0) {
      spawnArrayLifePlayer.splice(0, 1);
      boolForSpawnLifePlayer = false;
    }
  }, 10000);
}, 28000);

addEventListener("mousemove", (event) => {
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;
});
const animate = () => {
  animateit = requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.9)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  if (boolForSpawn) spawnArray[0].update();
  if (boolForSpawnLife) spawnArrayLife[0].update();
  if (boolForSpawnLifePlayer) spawnArrayLifePlayer[0].update();

  // console.log(mouse.x, mouse.y);
  let angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
  // console.log(angle);

  let dist = 60;
  let aimX = dist * Math.cos(angle);
  // console.log(aimX);

  let aimY = dist * Math.sin(angle);
  // console.log(aimX, aimY);villainsArray

  if (
    move.right.pressed &&
    player.x + player.radius + player.dx < canvas.width
  ) {
    player.dx = player.speed;
  } else if (move.left.pressed && player.x - player.radius + player.dx > 0) {
    player.dx = -player.speed;
  } else {
    player.dx = 0;
  }

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();

    if (villainSpawnBool) {
      let dist1 = Math.hypot(
        villainsArray[0].y - bullets[i].y,
        villainsArray[0].x - bullets[i].x
      );
      if (dist1 < villainsArray[0].radius + bullets[i].radius) {
        bullets.splice(i, 1);
        lifeCountVillain -= 20;
        if (lifeCountVillain === 0) {
          villainsArray.splice(0, 1);
          deployVillainBot1();
          villainSpawnBool = false;

          lifeShowerBoolForVillain = false;
        }
        continue;
      }
    }
    if (villainSpawnBool1) {
      let dist1 = Math.hypot(
        villainsArray1[0].y - bullets[i].y,
        villainsArray1[0].x - bullets[i].x
      );
      if (dist1 < villainsArray1[0].radius + bullets[i].radius) {
        bullets.splice(i, 1);
        lifeCountVillain1 -= 20;
        if (lifeCountVillain1 === 0) {
          villainsArray1.splice(0, 1);
          deployVillainBot2();
          villainSpawnBool1 = false;

          lifeShowerBoolForVillain1 = false;
        }
        continue;
      }
    }
    if (boolForbulletCollision) {
      for (let j = 0; j < bullets1.length; j++) {
        let dist = Math.hypot(
          bullets1[j].y - bullets[i].y,
          bullets1[j].x - bullets[i].x
        );
        if (dist < bullets1[j].radius + bullets[i].radius + 1) {
          bullets.splice(i, 1);
          bullets1.splice(j, 1);
          continue;
        }
      }
    }
    if (boolForSpawn) {
      let distance = Math.hypot(
        bullets[i].y - spawnArray[0].y,
        bullets[i].x - spawnArray[0].x
      );

      if (distance < bullets[i].radius + spawnArray[0].radius + 2) {
        boolForSpawn = false;
        spawnArray.splice(0, 1);
        bulletBool = true;
        bulletPowerUp();
        setTimeout(() => {
          bulletBool = false;
        }, 5000);
      }
    }
    if (boolForSpawnLife) {
      let distance1 = Math.hypot(
        bullets[i].y - spawnArrayLife[0].y,
        bullets[i].x - spawnArrayLife[0].x
      );

      if (distance1 < bullets[i].radius + spawnArrayLife[0].radius + 2) {
        lifeCount = 400;
        boolForSpawnLife = false;
        spawnArrayLife.splice(0, 1);
      }
    }
    if (boolForSpawnLifePlayer) {
      let distance2 = Math.hypot(
        bullets[i].y - spawnArrayLifePlayer[0].y,
        bullets[i].x - spawnArrayLifePlayer[0].x
      );

      if (distance2 < bullets[i].radius + spawnArrayLifePlayer[0].radius + 2) {
        lifeCountPlayer = 70;
        boolForSpawnLifePlayer = false;
        spawnArrayLifePlayer.splice(0, 1);
        boolForbulletCollision = false;
      }
    }
  }

  for (let i = 0; i < villains.length; i++) {
    villains[i].update();
    let distance = Math.hypot(
      villains[i].y + villains[i].h / 2 - (homeBase.y + homeBase.h / 2),
      villains[i].x + villains[i].w / 2 - (homeBase.x + homeBase.w / 2)
    );
    if (
      distance <
      Math.hypot(
        homeBase.h / 2 - villains[i].h / 2,
        homeBase.w / 2 - villains[i].w / 2
      )
    ) {
      villains.splice(i, 1);
      lifeCount -= 40;
      score -= 10;

      if (lifeCount === 0) {
        looseBool = true;
      }
      continue;
    }
    let dist = Math.hypot(player.y - villains[i].y, player.x - villains[i].x);
    if (
      dist <
      player.radius + Math.hypot(villains[i].h / 2, villains[i].w / 2) + 5
    ) {
      villains.splice(i, 1);

      lifeCountPlayer -= 10;
      score -= 20;
      if (lifeCountPlayer === 0) {
        looseBoolPlayer = true;
      }
      continue;
    }
    for (let j = 0; j < bullets.length; j++) {
      if (
        bullets[j].x - bullets[j].radius < 0 ||
        bullets[j].x + bullets[j].radius > canvas.width ||
        bullets[j].y - bullets[j].radius < 0 ||
        bullets[j].y + bullets[j].radius > canvas.height
      ) {
        bullets.splice(j, 1);
        continue;
      }
    }
    for (let j = 0; j < bullets.length; j++) {
      if (villains[i] !== undefined && bullets[j] !== undefined) {
        let distance = Math.hypot(
          villains[i].y + villains[i].h / 2 - bullets[j].y,
          villains[i].x + villains[i].w / 2 - bullets[j].x
        );
        if (distance < 1 + bullets[j].radius + villains[i].h / 2) {
          console.log("hitS");
          score += 20;

          villains.splice(i, 1);
          bullets.splice(j, 1);
        }
      }
    }
  }
  for (let i = 0; i < bullets1.length; i++) {
    bullets1[i].update();

    let distance = Math.hypot(
      homeBase.y + homeBase.h / 2 - bullets1[i].y,
      homeBase.x + homeBase.w / 2 - bullets1[i].x
    );
    if (distance < bullets1[i].radius + homeBase.w / 2) {
      lifeCount -= 40;
      bullets1.splice(i, 1);
      if (lifeCount === 0) {
        looseBool = true;
      }
    }
    if (villainSpawnBool && bullets1[i] !== undefined) {
      let distance10 = Math.hypot(
        player.y - bullets1[i].y,
        player.x - bullets1[i].x
      );
      if (distance10 < player.radius + bullets1[i].radius) {
        lifeCountPlayer -= 10;
        score -= 20;
        if (lifeCountPlayer === 0) {
          looseBoolPlayer = true;
        }
        bullets1.splice(i, 1);
      }
    }
  }
  if (villainSpawnBool) {
    for (let i = 0; i < villainsArray.length; i++) {
      turretbot = new TurretBot(villainsArray);
      turretbot.update();
      villainsArray[i].update();
    }
  }
  if (villainSpawnBool1) {
    for (let i = 0; i < villainsArray1.length; i++) {
      turretbot1 = new TurretBot1(villainsArray1);
      turretbot1.update();
      villainsArray1[i].update();
    }
  }

  turret = new Turret(player.x + player.dx, player.y + player.dy, aimX, aimY);

  turret.update();
  player.update();
  // pauseResume.update();
  text.update();
  highScoreText.update();
  baseLife.update();
  playerLife = new BaseLife(player.x - 35, player.y + 50, 70, 10, "grey");

  if (villainSpawnBool && lifeShowerBoolForVillain) {
    playerLife1 = new BaseLife(
      villainsArray[0].x - 35,
      villainsArray[0].y - 50,
      60,
      10,
      "grey"
    );
    playerLife1.update();
    homeBaseLife1 = new BaseLife(
      villainsArray[0].x - 35,
      villainsArray[0].y - 50,
      lifeCountVillain,
      10,
      "red"
    );
    homeBaseLife1.update();
  }
  if (villainSpawnBool1 && lifeShowerBoolForVillain1) {
    playerLife1 = new BaseLife(
      villainsArray1[0].x - 35,
      villainsArray1[0].y - 50,
      60,
      10,
      "grey"
    );
    playerLife1.update();
    homeBaseLife1 = new BaseLife(
      villainsArray1[0].x - 35,
      villainsArray1[0].y - 50,
      lifeCountVillain1,
      10,
      "red"
    );
    homeBaseLife1.update();
  }

  playerLife.update();
  homeBaseLife = new BaseLife(50, 50, lifeCount, 30, "purple");
  homeBaseLife.update();

  playerLifeCount = new BaseLife(
    player.x - 35,
    player.y + 50,
    lifeCountPlayer,
    10,
    "blue"
  );

  playerLifeCount.update();
  if (looseBool || looseBoolPlayer) {
    if (highScore < score) {
      highScore = score;
      localStorage.setItem("high_score", highScore);
    }
    cancelAnimationFrame(animateit);
    villainBool = false;
    soundBool = false;
    bgMusic.pause();

    setTimeout(() => {
      villainDropBool = false;
      villainDropBool1 = false;
      villainsArray = [];
      init();
      VillainSpawn();
      animateit = requestAnimationFrame(animate);

      looseBool = false;
      looseBoolPlayer = false;
      villainBool = true;
      soundBool = true;
      bgMusic.play();
      bgMusic.volume = 0.5;
    }, 2000);
  }
  homeBase.update();
};
animate();

document.addEventListener("keydown", (event) => {
  if (event.key == "D" || event.key == "d" || event.key == "ArrowRight") {
    move.right.pressed = true;
  }
  if (event.key == "W" || event.key == "w" || event.key == "ArrowUp") {
    player.dy = -player.speed;
  }
  if (event.key == "A" || event.key == "a" || event.key == "ArrowLeft") {
    move.left.pressed = true;
  }
  if (event.key == "S" || event.key == "s" || event.key == "ArrowDown") {
    player.dy = player.speed;
  }
  bgMusic.play();
  bgMusic.volume = 0.5;
  // if (event.code == "Space") {
  //   bullets.push(new Bullets(player.x, player.y, 5, "red"));
  // }
});

document.addEventListener("keyup", (event) => {
  if (event.key == "D" || event.key == "d" || event.key == "ArrowRight") {
    move.right.pressed = false;
  }
  if (event.key == "W" || event.key == "w" || event.key == "ArrowUp") {
    player.dy = 0;
  }
  if (event.key == "A" || event.key == "a" || event.key == "ArrowLeft") {
    move.left.pressed = false;
  }
  if (event.key == "S" || event.key == "s" || event.key == "ArrowDown") {
    player.dy = 0;
  }
});
document.querySelector("canvas").addEventListener("click", (event) => {
  let angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);
  const velocity = {
    x: Math.cos(angle) * 9,
    y: Math.sin(angle) * 9,
  };
  bullets.push(
    new Bullets(
      player.x,
      player.y,
      9,
      {
        x: velocity.x,
        y: velocity.y,
      },
      "blue"
    )
  );
  if (soundBool) {
    shootSound.currentTime = 0;
    shootSound.play();
  }

  // shootSound.playbackRate = 5;
});

document.querySelector(".pause").addEventListener("click", () => {
  console.log("hi");
  cancelAnimationFrame(animateit);
  villainBool = false;
  soundBool = false;
  document.querySelector(".pause").classList.remove("display");
  document.querySelector(".resume").classList.add("display");
  bgMusic.pause();
});
document.querySelector(".resume").addEventListener("click", () => {
  console.log("hi");
  animateit = requestAnimationFrame(animate);
  villainBool = true;
  VillainSpawn();
  soundBool = true;
  // animateMe = requestAnimationFrame(bulletPowerUp);
  // animateUs = requestAnimationFrame(VillainSpawn);
  document.querySelector(".resume").classList.remove("display");
  document.querySelector(".pause").classList.add("display");
  bgMusic.play();
  bgMusic.volume = 0.5;
});

////

///
