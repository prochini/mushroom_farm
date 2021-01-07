// Created by Sεηιrυ ραsαη

var animalNo = 0;
var cropsNo = -1;
var decNum = 0;
var decorations = [];
var animals = {};
var crops = {};
var selectionMode = "🍄";
var fields = 0;
var wallet = 9999999999;
var dict = {};
var inventory = {};//fig name amount id
var inventoryOpened = false;
var shopOpened = false;
var countClick = 0;
function animal(n, fig, size, price, products) {

  animalNo += 1;
  this.n = n;
  this.fig = fig;
  this.size = size; //max 128
  this.price = size;
  this.products = products;
  getAnimalCount = function () { return animalNo };
  return this;
}
function crop(id, n, fig, growTime, price, sellPrice, cropNum) {
  cropsNo += 1;
  dict[fig] = cropsNo;
  dict[n] = cropsNo;
  inventory[cropsNo] = [fig, n, 0, cropsNo];
  this.id = id;
  this.n = n;
  this.fig = fig;
  this.price = price;
  this.sellPrice = sellPrice;
  this.growTime = growTime;
  this.cropNum = cropNum;
  return this;
}

function decoration(fig, n, price, size) {
  this.id = decNum++;
  this.fig = fig;
  this.n = n;
  this.price = price;
  this.size = size;
  dict[fig] = this.id;
}

animals[0] = new animal("cow", "🐄", 100, 1000, ["milk"]);
animals[1] = new animal(0, "pig", "🐖", 30, 200, ["mud"]);
crops[0] = new crop(0, "Tomato", "🍅", 17000, 7, 10, 10);
crops[1] = new crop(1, "Corn", "🌽", 30000, 10, 15, 10);
crops[2] = new crop(2, "Chillies", "🌶", 35000, 17, 25, 10)
crops[3] = new crop(3, "Mushroom", "🍄", 10000, 11111, 30, 10);
crops[4] = new crop(4, "Brinjal", "🍆", 60000, 50, 65, 10);
crops[5] = new crop(5, "Grapes", "🍇", 90000, 100, 130, 20);
crops[6] = new crop(6, "Strawberry", "🍓", 120000, 160, 200, 20);
crops[7] = new crop(7, "Sweet potato", "🍠", 120000, 170, 200, 10);
crops[8] = new crop(8, "Clover", "🍀", 220000, 80, 100, 20);
crops[9] = new crop(9, "Tulip", "🌷", 240000, 350, 400, 10);
crops[10] = new crop(10, "Rose", "🌹", 250000, 500, 700, 10);
crops[11] = new crop(11, "Rice", "🌾", 360000, 650, 700, 20);


decorations[0] = new decoration("💩", "POO", 30, 15);
decorations[1] = new decoration("🚩", "Flag", 80, 25);
decorations[2] = new decoration("📪", "Post box", 150, 25);
decorations[3] = new decoration("⛽", "Fuel shed", 300, 30);
decorations[4] = new decoration("⛳", "Golf pitch", 350, 30);
decorations[5] = new decoration("🎁", "Gift", 500, 20);
decorations[6] = new decoration("⛄", "Snow man", 550, 30);

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
var fieldName = ["聰明蛋的地", "士凱的地", "詠升的地", "吉米的地", "", "家安的地", "川川的地", "牛肝菌的地", "杰哥的地",];
$('.yesBtn').click(function () {
  $('.modal').fadeOut(300);
})
$('.noBtn').click(function () {
  $('.scoreModal').fadeOut(300);
  $('.scoreModal').fadeIn(300);
})
$('.whatUpMan').click(function () {
  $('.dialogModal').fadeIn(300);
})

$(document).ready(function () {
  //$('.scoreModal').fadeIn(300);
  $("#wallet").html("💵 錢錢💵 " + wallet);
  for (ci = 0; ci < cropsNo + 1; ci++) {
    $("#cropmenu").append("<h4>" + crops[ci].fig + "" + crops[ci].n + "</h4><br><Price: 💵" + crops[ci].price + "<br>Sell price: 💵 " + crops[ci].sellPrice + "<br>Grow time: ⏳ " + crops[ci].growTime / 1000 + "s<br>Crop number: " + crops[ci].cropNum + "<br><hr>");
  }
  var i = 0;
  $(".cell").each(function (i) {
    if (i != 4) {
      $(this).append("<span>" + fieldName[i] + "</span><table class='" + i + "'></table>");
    }
    i++;
  });
  for (rows = 0; rows < 3; rows++) {
    $("table").append("<tr></tr>");
  };

  for (cols = 0; cols < 3; cols++) {
    $("tr").each(function (i) {
      $(this).append("<td><button onclick='javascript:void(farm(event))'class='field' id='" + uuidv4() + "'></button></td>")
    });
  }
});

function farm(event) {
  try {
    if ($("#" + event.target.id).html() == "" && selectionMode.substring(0, 1) != "none" && wallet - crops[dict[selectionMode]].price >= 0) {
      grow(event.target.id, crops[parseInt(dict[selectionMode])]);
      wallet -= crops[dict[selectionMode]].price;
      $("#wallet").html("💵 錢錢💵" + wallet);
      countClick += 1;
      if (countClick == 10) {
        $('.scoreModal').fadeIn(300);
      }
    } else if ($("#" + event.target.id).html() != "") {
      //inventory[crops[dict[$("#" + event.target.id).html().substring(4, 6)]].id][2] += parseInt(crops[dict[$("#" + event.target.id).html().substring(4, 6)]].cropNum);
      $("#" + event.target.id).html("");
    }
  } catch (e) {
    $("#" + event.target.id).html("");
  }
}

function randomGrow(field, plant) {
  var ran = Math.floor(Math.random() * 6) + 1;
  setTimeout(function () {
    $("#" + field).html(plant[ran]);
  }, ran * 1000);
}

function grow(field, plant) {
  $("#" + field).html("🍄");
  var who = $("#" + field).closest('table').attr('class');
  //console.log(who);
  switch (who) {
    case "0":
      randomGrow(field, ["​🪐", "🥚", "🍳", "🐣​", "🥚", "🗿"]); //聰明蛋的地
      break;
    case "1":
      randomGrow(field, ["☄️​", "☄️", "🔥", "⚡️​", "🔥", "🌊"]); //士凱的地
      break;
    case "2":
      randomGrow(field, ["​ 💦", "💦", "💦", "​🥛", "🚱", "💦"]); //詠升的地
      break;
    case "3":
      randomGrow(field, ["​💀​", "☠️", "💣", "​☢️​", "💩", "💩"]); //吉米的地
      break;
    case "4":

      break;
    case "5":
      randomGrow(field, ["​🍆​", "🍑", "🥒", "​🍌​", "🍆", "🍑"]); //家安的地
      break;
    case "6":
      randomGrow(field, ["​🐉​", "🧙", "🛸", "👾​", "🦠", "🥔"]); //川川的地
      break;
    case "7":
      randomGrow(field, ["​🍄​", "🍄", "🍄", "​🍄​", "🍄", "🍄"]); //牛肝菌的地
      break;
    case "8":
      randomGrow(field, ["🪐 ​", "🐖", "🐩", "​🎆​", "🦐", "🌈"]); //XX的地
      break;
    default:
      // code block
      break;
  }
}
var app = new PIXI.Application(500, 300, { transparent: true });
document.getElementById("mushBugs").appendChild(app.view);

var sprites = new PIXI.particles.ParticleContainer(300, {
  scale: true,
  position: true,
  rotation: true,
  uvs: true,
  alpha: true,
});
app.stage.addChild(sprites);

// create an array to store all the sprites
var maggots = [];

var totalSprites = app.renderer instanceof PIXI.WebGLRenderer ? 10000 : 100;

for (var i = 0; i < totalSprites; i++) {
  // create a new Sprite
  var dude = PIXI.Sprite.fromImage('./mushroom.png');

  dude.tint = Math.random() * 0xE8D4CD;

  // set the anchor point so the texture is centerd on the sprite
  dude.anchor.set(0.5);

  // different maggots, different sizes
  dude.scale.set(0.8 + Math.random() * 0.3);

  // scatter them all
  dude.x = Math.random() * app.screen.width;
  dude.y = Math.random() * app.screen.height;

  dude.tint = Math.random() * 0x808080;

  // create a random direction in radians
  dude.direction = Math.random() * Math.PI * 2;

  // this number will be used to modify the direction of the sprite over time
  dude.turningSpeed = Math.random() - 0.8;

  // create a random speed between 0 - 2, and these maggots are slooww
  dude.speed = (2 + Math.random() * 2) * 0.2;

  dude.offset = Math.random() * 100;

  // finally we push the dude into the maggots array so it it can be easily accessed later
  maggots.push(dude);

  sprites.addChild(dude);
}

// create a bounding box box for the little maggots
var dudeBoundsPadding = 100;
var dudeBounds = new PIXI.Rectangle(
  -dudeBoundsPadding,
  -dudeBoundsPadding,
  app.screen.width + dudeBoundsPadding * 2,
  app.screen.height + dudeBoundsPadding * 2
);

var tick = 0;

app.ticker.add(function () {
  // iterate through the sprites and update their position
  for (var i = 0; i < maggots.length; i++) {
    var dude = maggots[i];
    dude.scale.y = 0.95 + Math.sin(tick + dude.offset) * 0.05;
    dude.direction += dude.turningSpeed * 0.01;
    dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
    dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
    dude.rotation = -dude.direction + Math.PI;

    // wrap the maggots
    if (dude.x < dudeBounds.x) {
      dude.x += dudeBounds.width;
    } else if (dude.x > dudeBounds.x + dudeBounds.width) {
      dude.x -= dudeBounds.width;
    }

    if (dude.y < dudeBounds.y) {
      dude.y += dudeBounds.height;
    } else if (dude.y > dudeBounds.y + dudeBounds.height) {
      dude.y -= dudeBounds.height;
    }
  }

  // increment the ticker
  tick += 0.1;
});
