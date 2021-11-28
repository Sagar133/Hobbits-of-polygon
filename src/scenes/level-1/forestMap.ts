import { GameObjects, Scene, Tilemaps } from 'phaser';

import { Player } from '../../classes/player';
import { Enemy } from '../../classes/enemy';
import { gameObjectsToObjectPoints } from '../../helpers/gameobject-to-object-point';

import { EVENTS_NAME } from '../../consts';

export class LevelForest extends Scene {
  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset;
  private wallsLayer!:any;
  private groundLayer!: any;
  private treesLayer! : any;
  private walLayer! : any;
  private chests!: GameObjects.Sprite[];
  private enemies!: Enemy[];

  constructor() {
    super('level-forest-scene');
  }

  create(): void {
    this.initMap();
    this.player = new Player(this, 320, 200);
    this.initChests();
    this.initEnemies();
    this.initCamera();

    this.physics.add.collider(this.player, this.wallsLayer);
  }

  update(): void {
    this.player.update();
  }

  private initMap(): void {
   

    this.map = this.make.tilemap({ key: 'forest', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('forestTile', 'tilesIce');
    this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0);
    this.treesLayer = this.map.createLayer('trees', this.tileset, 0, 0);
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0);
    this.wallsLayer.setCollisionByProperty({ collides: true });


    // this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height);
    this.physics.world.setBounds(0, 0, this.groundLayer.width, this.groundLayer.height);
    //this.showDebugWalls();
  }

  private initChests(): void {
    const chestPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Chests', (obj) => obj.name === 'ChestPoint'),
    );

    this.chests = chestPoints.map((chestPoint) =>
      this.physics.add.sprite(chestPoint.x, chestPoint.y, 'tiles_spr', 595).setScale(1.5),
    );

    this.chests.forEach((chest) => {
      this.physics.add.overlap(this.player, chest, (obj1, obj2) => {
        this.game.events.emit(EVENTS_NAME.chestLoot);
        obj2.destroy();
        // this.cameras.main.flash();
      });
    });
  }

  private initEnemies(): void {
    const enemiesPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Enemies', (obj) => obj.name === 'EnemyPoint'),
    );

    this.enemies = enemiesPoints.map((enemyPoint) =>
      new Enemy(this, enemyPoint.x, enemyPoint.y, 'tiles_spr', this.player, 503)
        .setName(enemyPoint.id.toString())
        .setScale(1.5),
    );

    this.physics.add.collider(this.enemies, this.wallsLayer);
    this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(
      this.player,
      this.enemies,
      (obj1, obj2) => {
        // Web3Damage; here we can change the damage of user
        (obj1 as Player).getDamage(1);
      },
      undefined,
      this,
    );
  }

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
  }
}
