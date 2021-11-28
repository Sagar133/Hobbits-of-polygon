import { Scene } from "phaser";
import { loadWeb3, faucet, enterGamePlay, getAlgoRandomness } from "../../web3/web3";
import { Attributes } from "../../web3/attributes";

let button: any;
let button_1: any;

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
      // let enter = await enterGamePlay()
      // console.log(enter);

      //if (enter === true) {
      // alert('triggered')
      //console.log("selected peter character");

      let meta:any = await getAlgoRandomness()
      console.log('meta', meta);

      const len = Math.ceil(Math.log10(meta + 1));
      const rounded = meta % len //Math.ceil(Math.round(num / len))
      let stripped = rounded % Math.random() * 10 + 10
      let speedfunc = parseInt(meta)

      console.log('speedfunc', speedfunc);
      
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

      //}
    });
  }

  playerAttributes() {
    let setAttributes = new Attributes(110, 40, 1);

    this.hp = setAttributes.getHp();
    this.damage = setAttributes.getDamage();
    this.speed = setAttributes.getSpeed();

    return {
      hp: this.hp,
      damage: this.damage,
      speed: this.speed,
    };
  }
}
