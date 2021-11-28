import { Scene } from "phaser";
import { loadWeb3, faucet, enterGamePlay, getAlgoRandomness } from "../../web3/web3";
import { Attributes } from "../../web3/attributes";
import { ethers } from "ethers";

let button: any;
let button_1: any;
let vrfRandomness: any;

export class LoadingScene extends Scene {
  public hp: any;
  public speed: any;
  public damage: any;

  constructor() {
    super("loading-scene");
  }

  preload(): void {
    this.load.baseURL = "assets/";

    // PLAYER LOADING
    this.load.image("king", "sprites/king.png");
    this.load.image("wallpaper", "tilemaps/tiles/gimli.jpg");
    this.load.image("start", "tilemaps/tiles/start.png");
    this.load.image("faucet", "tilemaps/tiles/faucet.png");

    this.load.atlas(
      "a-king",
      "spritesheets/a-king.png",
      "spritesheets/a-king_atlas.json"
    );

    // MAP LOADING
    this.load.image({
      key: "tilesDungeon",
      url: "tilemaps/tiles/dungeon-16-16.png",
      // url: 'tilemaps/tiles/tuxmon-sample.png',
    });

    this.load.image({
      key: "tilesIce",
      // url: 'tilemaps/tiles/dungeon-16-16.png',
      url: "tilemaps/tiles/tuxmon-sample.png",
    });
    this.load.tilemapTiledJSON("dungeon", "tilemaps/json/dungeon.json");
    this.load.tilemapTiledJSON("forest", "tilemaps/json/forest.json");
    this.load.tilemapTiledJSON("ice", "tilemaps/json/ice.json");

    // CHEST LOADING
    this.load.spritesheet("tiles_spr", "tilemaps/tiles/dungeon-16-16.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create(): void {
    let mainPic = this.add.image(0, 0, "wallpaper");
    let self = this;

    loadWeb3();

    this.add.text(
      this.sys.game.canvas.width / 9,
      50,
      "Connect Metamask and help mighty king to reclaim his homeland!!",
      {
        font: "30px Courier",
      }
    );

    button_1 = this.physics.add.image(710, 490, "faucet").setInteractive();

    button = this.physics.add.image(710, 640, "start").setInteractive();

    Phaser.Display.Align.In.Center(
      mainPic,
      this.add.zone(
        700,
        500,
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2
      )
    );

    button_1.on("pointerdown", function (pointer: any) {
      faucet();
    });

    button.on("pointerdown", async function (pointer: any) {
      let enter = await enterGamePlay()
      // console.log(enter);

      if (enter === true) {
        // alert('triggered')
        //console.log("selected peter character");
        let meta:any = await getAlgoRandomness()
        let num = ethers.utils.formatEther( meta )
        vrfRandomness = meta
        let mapNum = Math.floor(Math.random() * 3);
        console.log("map", mapNum);

        if (mapNum === 0) {
          self.scene.start("level-1-scene");
          self.scene.start("ui-scene");
        } else if (mapNum === 1) {
          self.scene.start("level-ice-scene");
          self.scene.start("ui-scene");
        } else {
          self.scene.start("level-forest-scene");
          self.scene.start("ui-scene");
        }
      }
    });
  }

  public playerAttributes() {
    // console.log('vrfRandomness: 120', vrfRandomness);
    let hp = Math.round(this.setHp(vrfRandomness))
    let speed = Math.round(this.setSpeed(vrfRandomness))
    let damage = Math.round(this.setDamge(vrfRandomness))

    let setAttributes = new Attributes(hp, speed, damage);
    
    this.hp = setAttributes.getHp();
    this.damage = setAttributes.getDamage();
    this.speed = setAttributes.getSpeed();

    return {
      hp: this.hp,
      damage: this.damage,
      speed: this.speed,
    };
  }

  setSpeed(val:any) {
    const len = Math.ceil(Math.log10(val + 1));
    const rounded = val % len //Math.ceil(Math.round(num / len))
    let stripped = rounded % Math.random() * 100 + 80
    let speedfunc = Number(stripped)

    //console.log('speedfunc', speedfunc);
    return speedfunc
  }

  setHp(val:any) {
    const len = Math.ceil(Math.log10(val + 1));
    const rounded = val % len //Math.ceil(Math.round(num / len))
    let stripped = rounded % Math.random() * 100 + 100
    let hpFunc = Number(stripped)

    //console.log('hpFunc', hpFunc);
    return hpFunc
  }

  setDamge(val:any) {
    const len = Math.ceil(Math.log10(val + 1));
    const rounded = val % len //Math.ceil(Math.round(num / len))
    let stripped = rounded % Math.random() * 5 + 1
    let damageFunc = Number(stripped)

    //console.log('damageFunc', damageFunc);
    return damageFunc
  }
}
