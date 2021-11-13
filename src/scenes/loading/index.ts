import { Scene } from 'phaser';

let button:any;

export class LoadingScene extends Scene {

  constructor() {
    super('loading-scene');
  }

  preload(): void {
    this.load.baseURL = 'assets/';

    // PLAYER LOADING
    this.load.image('king', 'sprites/king.png');
    this.load.image('wallpaper', 'tilemaps/tiles/gimli.jpg');

    this.load.atlas('a-king', 'spritesheets/a-king.png', 'spritesheets/a-king_atlas.json');

    // MAP LOADING
    this.load.image({
      key: 'tiles',
      url: 'tilemaps/tiles/dungeon-16-16.png',
    });
    this.load.tilemapTiledJSON('dungeon', 'tilemaps/json/dungeon.json');

    // CHEST LOADING
    this.load.spritesheet('tiles_spr', 'tilemaps/tiles/dungeon-16-16.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create(): void {
    let mainPic = this.add.image(0, 0, "wallpaper");
    let self = this;

    button = this.physics.add.image(100, 400, 'king')
    .setInteractive()

    Phaser.Display.Align.In.Center(
      mainPic,
      this.add.zone(
        700,
        500,
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2,
      )
    );

    button.on(
      "pointerdown",
      function (pointer: any) {
        // alert('triggered')
        //console.log("selected peter character");
        self.scene.start('level-1-scene');
        self.scene.start('ui-scene');
      }
    );
  }
}
