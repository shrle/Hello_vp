<template lang="html">
<main>
  <div>{{toriWatch}}</div>
</main>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import * as PIXI from "pixi.js";
window.PIXI = PIXI;
import "pixi-layers";
import Keyboard from "./Keyboard";

var toriWatch: PIXI.Rectangle;

@Component
export default class Canvas extends Vue {
  app!: PIXI.Application;
  container!: PIXI.Container;
  layer!: PIXI.display.Layer;
  niwatori!: PIXI.Texture;
  toriWatch: PIXI.Rectangle = new PIXI.Rectangle(1, 0, 0, 0);

  test: number = 1;

  public mounted() {
    this.toriWatch = new PIXI.Rectangle(1, 0, 0, 0);
    toriWatch = this.toriWatch;
    Object.assign(toriWatch, new PIXI.Rectangle(2, 0, 0, 0));

    this.app = new PIXI.Application(800, 600, {
      backgroundColor: 0x1099bb,
    });
    (document.querySelector("main") as HTMLInputElement).appendChild(
      this.app.view
    );

    this.app.stage = new PIXI.display.Stage();

    this.layer = new PIXI.display.Layer();
    this.layer.useRenderTexture = true;
    this.layer.useDoubleBuffer = true;

    var trailSprite = new PIXI.Sprite(this.layer.getRenderTexture());
    trailSprite.alpha = 0.7;

    this.layer.addChild(trailSprite);

    this.app.stage.addChild(this.layer);
    var showLayer = new PIXI.Sprite(this.layer.getRenderTexture());
    this.app.stage.addChild(showLayer);

    PIXI.loader
      .add("spritesheet", "/assets/spritesheet/tori.json")
      .add("kozakuraspritesheet", "/assets/spritesheet/kozakura.json")
      .load(this.onAssetsLoaded);

    this.container = new PIXI.Container();

    this.app.stage.interactive = true;
    this.app.stage.addChild(this.container);
  }

  private onAssetsLoaded() {
    const toriNames: string[] = ["niwatori.png", "okame.png"];
    var toriSprites: PIXI.Texture[] = [];

    for (const name of toriNames) {
      toriSprites.push(PIXI.Texture.fromFrame(name));
    }

    var toris: PIXI.Container[] = [];
    for (var i = 0; i < 6; i++) {
      toris[i] = new PIXI.Container();
      toris[i].position.set(
        this.app.screen.width / 2,
        this.app.screen.height / 2
      );
      toris[i].rotation = (i / 6) * (Math.PI * 2);
      toris[i].pivot.set(0, -200);

      var sprite = new PIXI.Sprite(toriSprites[i % toriSprites.length]);
      toris[i].addChild(sprite);
      sprite.anchor.set(0.5);
      sprite.scale.set(0.2 + Math.random() * 0.2);

      //this.layer.addChild(toris[i]);
    }

    this.app.ticker.add(function (delta) {
      for (var i = 0; i < toris.length; i++) {
        toris[i].rotation += 0.05 * delta;
        toris[i].children[0].rotation += 0.1 * delta;
      }
    });
    /*
    {
      let sprite: PIXI.Sprite = PIXI.Sprite.fromFrame("kozakura.png");
      var kozakura: Tori = new Tori({
        app: this.app,
        parent: this.layer,
        sprite: sprite,
        x: rangeRandom(-200, this.app.screen.width - 200),
        y: this.app.screen.height - sprite.height + 300,
        rangeX: { min: -200, max: this.app.screen.width - 200 },
        jump: -30,
      });
    }

    {
      let sprite: PIXI.Sprite = PIXI.Sprite.fromFrame("okame.png");
      var kozakura: Tori = new Tori({
        app: this.app,
        parent: this.layer,
        sprite: sprite,
        x: rangeRandom(-200, this.app.screen.width - 200),
        y: this.app.screen.height - sprite.height + 300,
        rangeX: { min: -200, max: this.app.screen.width - 200 },
        jump: -30,
      });
    }

    {
      let sprite: PIXI.Sprite = PIXI.Sprite.fromFrame("niwatori.png");
      var kozakura: Tori = new Tori({
        app: this.app,
        parent: this.layer,
        sprite: sprite,
        x: rangeRandom(-200, this.app.screen.width - 200),
        y: this.app.screen.height - sprite.height + 300,
        rangeX: { min: -200, max: this.app.screen.width - 200 },
        jump: -30,
      });
    }

    {
      let sprite = PIXI.Sprite.fromFrame("okame.png");
      var player: Player = new Player({
        app: this.app,
        parent: this.layer,
        sprite: sprite,
        x: -200,
        y: this.app.screen.height - sprite.height + 300,
        rangeX: { min: -200, max: this.app.screen.width - 200 },
        jump: 0,
      });
    }
    {
      let sprite = PIXI.Sprite.fromFrame("kozakura.png");
      var player: Player = new Player({
        app: this.app,
        parent: this.layer,
        sprite: sprite,
        x: -200,
        y: this.app.screen.height - sprite.height + 100,
        rangeX: { min: -200, max: this.app.screen.width - 200 },
        jump: 0,
      });
    }
    {
      let sprite = PIXI.Sprite.fromFrame("niwatori.png");
      var player: Player = new Player({
        app: this.app,
        parent: this.layer,
        sprite: sprite,
        x: -200,
        y: this.app.screen.height - sprite.height - 100,
        rangeX: { min: -200, max: this.app.screen.width - 200 },
        jump: 0,
      });
    }
    */
    {
      //background setting
      let background = PIXI.Texture.from("/assets/spritesheet/background.png");
      const backgroundSprite = new PIXI.extras.TilingSprite(
        background,
        this.app.screen.width,
        this.app.screen.height
      );
      this.app.stage.addChild(backgroundSprite);
      this.app.ticker.add((delta) => {
        backgroundSprite.tilePosition.x -= 1;
      });
    }
    {
      let kozakuraContainer = new PIXI.Container();
      let bodySprite = PIXI.Sprite.fromFrame("kozakura_body.png");
      let rightLeg = PIXI.Sprite.fromFrame("kozakura_leg.png");
      let leftLeg = PIXI.Sprite.fromFrame("kozakura_leg.png");
      kozakuraContainer.addChild(leftLeg, bodySprite, rightLeg);
      this.app.stage.addChild(kozakuraContainer);

      bodySprite.x = 100;
      bodySprite.y = 300;
      bodySprite.scale = new PIXI.Point(0.5, 0.5);
      rightLeg.x = 290;
      rightLeg.y = 470;
      rightLeg.scale = new PIXI.Point(0.5, 0.5);
      leftLeg.x = 315;
      leftLeg.y = 470;
      leftLeg.scale = new PIXI.Point(0.5, 0.5);
      let legDir = 0;
      this.app.ticker.add((delta) => {
        legDir += 0.1;
        rightLeg.x = 290 + Math.cos(legDir) * 16;
        rightLeg.y = 470 + Math.sin(legDir) * 8;

        leftLeg.x = 315 + Math.cos(legDir + Math.PI) * 16;
        leftLeg.y = 470 + Math.sin(legDir + Math.PI) * 8;
      });
    }
  }
}

type Range = {
  min: number;
  max: number;
};

function rangeRandom(min: number, max: number): number {
  min = Math.floor(min);
  max = Math.floor(max);

  var range = max - min;
  if (range < 1) return 0;

  return Math.floor(Math.random() * range) + min;
}

class Collision {
  relativeRect: PIXI.Rectangle;
  absoluteRect: PIXI.Rectangle;
  character: Character;
  hitProc: object;
  public area: PIXI.Graphics;

  constructor(obj: {
    character: Character;
    rect: PIXI.Rectangle;
    hitProc: object;
  }) {
    this.character = obj.character;
    this.relativeRect = Object.assign({}, obj.rect);
    this.absoluteRect = Object.assign({}, obj.rect);

    this.hitProc = obj.hitProc;

    this.area = new PIXI.Graphics()
      .beginFill(0xff0000, 0.5)
      .drawRect(
        this.absoluteRect.x,
        this.absoluteRect.y,
        this.absoluteRect.width,
        this.absoluteRect.height
      )
      .endFill();
  }

  public update(delta: number): void {
    this.absoluteRect.x = this.character.x + this.relativeRect.x;
    this.absoluteRect.y = this.character.y + this.relativeRect.y;

    this.area.clear();
    this.area
      .beginFill(0xff0000, 0.5)
      .drawRect(
        this.absoluteRect.x,
        this.absoluteRect.y,
        this.absoluteRect.width,
        this.absoluteRect.height
      )
      .endFill();
  }

  public judg(b: Collision): boolean {
    /*
    var my = this.getPoint();
    var op = b.getPoint(); // op = Opponent
    if (my.ax < op.bx && my.bx > op.ax && my.ay < op.by && my.by > op.ay) {
      return true;
    }
    */
    return false;
  }
}

class Character {
  app: PIXI.Application;
  parent: PIXI.Container | PIXI.display.Layer;
  sprite: PIXI.Sprite;
  x: number;
  y: number;
  rangeX: Range;
  vx: number;
  vy: number;
  gravAccel: number;
  jump: number;

  collision!: Collision;

  constructor(obj: {
    app: PIXI.Application;
    parent: PIXI.Container | PIXI.display.Layer;
    sprite: PIXI.Sprite;
    x: number;
    y: number;
    rangeX: Range;
    jump: number;
  }) {
    this.app = obj.app;
    this.parent = obj.parent;
    this.sprite = obj.sprite;
    this.x = obj.x;
    this.y = obj.y;
    this.rangeX = obj.rangeX;
    this.vx = 0;
    this.vy = obj.jump;
    this.gravAccel = 1;
    this.jump = obj.jump;

    this.sprite.scale.set(0.5);
    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.app.ticker.add((delta) => {
      this.update(delta);
    });
    this.parent.addChild(this.sprite);
  }

  public update(delta: number): void {}
}

class CharacterManager {
  private static instance: CharacterManager;
  private constructor() {}

  public static getInstance(): CharacterManager {
    if (!CharacterManager.instance) {
      CharacterManager.instance = new CharacterManager();
    }
    return CharacterManager.instance;
  }
}

class Tori extends Character {
  landingPoint: PIXI.Point;
  constructor(obj: {
    app: PIXI.Application;
    parent: PIXI.Container | PIXI.display.Layer;
    sprite: PIXI.Sprite;
    x: number;
    y: number;
    rangeX: Range;
    jump: number;
  }) {
    super(obj);

    this.landingPoint = new PIXI.Point(obj.x, obj.y);
    this.collision = new Collision({
      character: this,
      rect: new PIXI.Rectangle(100, 150, 200, 50),
      hitProc: function (): void {},
    });

    this.app.ticker.add((delta) => {
      this.collision.update(delta);
    });

    this.parent.addChild(this.collision.area);
  }

  public update(delta: number): void {
    this.vy += this.gravAccel;
    this.y += this.vy;
    this.x += this.vx;

    if (this.landingPoint.y < this.y) {
      this.y = this.landingPoint.y;
      this.setJump();
    }

    this.sprite.y = this.y;
    this.sprite.x = this.x;

    Object.assign(toriWatch, this.collision.absoluteRect);
  }

  protected setJump(): void {
    this.vy = this.jump;
    this.landingPoint.x = rangeRandom(this.rangeX.min, this.rangeX.max);
    var fcnt = this.jumpFrameCount();
    this.vx = (this.landingPoint.x - this.x) / fcnt;
  }

  private jumpFrameCount(): number {
    var fcnt = 0;
    var y = this.y;
    var vy = this.jump;

    y += vy;
    vy += this.gravAccel;
    fcnt++;
    while (this.y > y) {
      y += vy;
      vy += this.gravAccel;
      fcnt++;
    }
    return fcnt;
  }
}

class Player extends Character {
  keyboard!: Keyboard;
  constructor(obj: {
    app: PIXI.Application;
    parent: PIXI.Container | PIXI.display.Layer;
    sprite: PIXI.Sprite;
    x: number;
    y: number;
    rangeX: Range;
    jump: number;
  }) {
    super(obj);
    this.keyboard = Keyboard.getInstance();
  }

  public update(delta: number): void {
    // 左右移動
    if (this.keyboard.keyState[Keyboard.keycode.LEFT]) {
      this.vx = -5;
    } else if (this.keyboard.keyState[Keyboard.keycode.RIGHT]) {
      this.vx = +5;
    } else {
      this.vx = 0;
    }

    this.x += this.vx;

    this.sprite.x = this.x;
  }
}

var keycodes: { [s: string]: number } = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  A: 65,
  N: 78,
  R: 82,
  X: 88,
  Z: 90,
};

interface Key {
  code: number;
  proc: Function;
}
var onKeys: Key[] = [
  {
    code: keycodes.left,
    proc: function () {},
  },
  {
    code: keycodes.up,
    proc: function () {},
  },
  {
    code: keycodes.right,
    proc: function () {},
  },
  {
    code: keycodes.down,
    proc: function () {},
  },
];

document.onkeydown = function (e) {
  for (const onKey of onKeys) {
    if (onKey.code === e.keyCode) {
      onKey.proc();
    }
  }
};

interface EventManage {
  event: any;
  code: number;
  proc: Function;
}
class KeyEvent {
  constructor() {}
}

{
  let name: string = "hogehoge";
  name = "humuhumu";
}

{
  let name: string = "takashi";
  name = "hiroyuki";
}

function testA() {
  var hello: string = "Hello A";
}
function testB() {
  var hello: string = "Hello A";
}
</script>
