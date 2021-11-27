import { Physics } from 'phaser';
import { LoadingScene } from '../scenes/loading/index'

export class Actor extends Physics.Arcade.Sprite {
  protected sceneClass:any;
  protected attributes:any;

  protected hp = 100;
  protected speed = 150;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.getBody().setCollideWorldBounds(true);
    
    this.sceneClass = new LoadingScene()
    this.attributes = this.sceneClass.playerAttributes()
    console.log('attributes', this.attributes) 

    this.hp = this.attributes.hp;
  }


  public getDamage(value?: number): void {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value) {
          this.hp = this.hp - value;
        }
      },
      onComplete: () => {
        this.setAlpha(1);
      },
    });
  }

  public getHPValue(): number {
    return this.hp;
  }

  protected checkFlip(): void {
    if (this.body.velocity.x < 0) {
      this.scaleX = -1;
    } else {
      this.scaleX = 1;
    }
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}
